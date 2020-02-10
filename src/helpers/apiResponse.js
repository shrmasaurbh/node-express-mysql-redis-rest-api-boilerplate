const errResponse = require('./errorCode');

module.exports = {

	apiResp : (req, res, data = [], meta = {}, json = true ) => {
	    var metaData = {...meta };
	    // if(data.isEmpty()){
	    // 	metaData.status = 400;
	    // 	metaData.error = true;
	    // }

	    metaData.error = 0;
	    if(meta.message == undefined){
	    // console.log("errrrrrrrrrrrrr")
	    	metaData.message = errResponse[metaData.status].message;
	    }else{

	    	metaData.message = meta.message;
	    }
		// metaData.count = data.length>0 ? data.length : 0;

		const response = { data, meta: metaData };
	    
	    if (json) {
	        res.status(metaData.status).json(response);
	    }
	    // return output;

	},



	apiErr : (req, res, status, err = {}) => {
	    var data = []
	    var metaData = {}

	    // console.log(err.message)
	    metaData.error = 1;
	    metaData.status = status;
	    if(err.message == undefined){
	    // console.log("errrrrrrrrrrrrr")
	    	metaData.message = errResponse[status].message;
	    }else{

	    	metaData.message = err.message;
	    }

		
		const output = { data, meta: metaData };
			    
       res.status(status).json(output);
	    // return output;

	}


};
