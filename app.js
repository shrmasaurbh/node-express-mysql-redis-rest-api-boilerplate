global.BASEPATH   = __dirname ;
global.CONFIG     = require('./src/config/config');
global.CONSTANT   = require('./src/helpers/constants');

const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const compress 		= require('compression');
const cors        = require('cors');
const winston 		= require('winston');
const redis       = require('redis');
// const pe            = require('parse-error');

const router      = require('./src/routes');
const connection  = require('./src/config/connections');
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

/**
 * Express instance
 * @public
 */
const app = express();

/**
 * Create connection.
 */
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     winston.error(err)
//     process.exit(1);
//   }
//   winston.info('Mysql connected')
//   console.log('connected as id ' + connection.threadId);
// });

// app.use(morgan('combined'), { stream: winston.stream });

connection.sequelize.authenticate().then(() => {
  winston.info('Mysql connected')
    console.log('Connected to SQL database:', CONFIG.mysqldb_name);
})
.catch(err => {
    console.error('error connecting: ' + err.stack);
    winston.error(err)
    // process.exit(1);
    console.error('Unable to connect to SQL database:',CONFIG.mysqldb_name, err);
});

var client = redis.createClient()
// var client = redis.createClient(CONFIG.redis_port, CONFIG.redis_host);
client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

// compress all requests
app.use(compress())




// request logging. dev: console | production: file
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.raw());
// app.use(cookieParser());


// var cors = function(req, res, next) {
//   var whitelist = [
//     'http://localhost:8000',
//     'http://localhost:3002',
//   ];
//   var origin = req.headers.origin;
//   if (whitelist.indexOf(origin) > -1) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   next();
// }
// app.use(cors);

// app.use(cors());
// app.use(function(req, res, next) {
//   var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000'];
//   var origin = req.headers.origin;
//   if(allowedOrigins.indexOf(origin) > -1){
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
//   // return next();
// });

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
    // res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
  // if (req.method === "OPTIONS") {
  //   return res.status(200).json({});
  // }
  next();
});


// app.use((req, res, next) => {
//   req.uuid = `uuid_${Math.random()}`; // use "uuid" lib
//   next();
// });

// app.use('/', function(req, res){
// 	res.statusCode = 200;//send the appropriate status code
// 	res.json({status:"success", message:"API is working", data:{}})
// });
app.use('/api', router);



// catch 404 and forward to error handler
// throw 404 if URL not found
app.all("*", function(req, res,next) {
  const error = new Error("URL not found");
  error.status = 404;
  next(error);
	// return apiResponse.notFoundResponse(res, "Page not found");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("err",err)
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  apiResp.apiErr( req, res, 300, err);

});


//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('--------------------------------');
    console.error('Uncaught Error    => ', error);
});

module.exports = app;

