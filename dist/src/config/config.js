'use strict';

require('dotenv').config();

var CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || 'development';
CONFIG.port = process.env.PORT || '4000';

CONFIG.mysqldb_dialect = process.env.MYSQLDB_DIALECT || 'mysql';
CONFIG.mysqldb_host = process.env.MYSQLDB_HOST || 'localhost';
CONFIG.mysqldb_port = process.env.MYSQLDB_PORT || '3306';
CONFIG.mysqldb_name = process.env.MYSQLDB_NAME || 'name';
CONFIG.mysqldb_user = process.env.MYSQLDB_USER || 'root';
CONFIG.mysqldb_password = process.env.MYSQLDB_PASSWORD || 'db-password';

CONFIG.redis_host = process.env.REDIS_HOST || 'redis';
CONFIG.redis_port = process.env.REDIS_PORT || '6379';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'AaBrAkaDaBaRa';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '1h';

// CONFIG.redis_host  = process.env.REDIS_HOST || '10000';
module.exports = CONFIG;