const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, '.env')});

const PORT = process.env.PORT;

// ARANGODB Database Information
const ARANGODB_ADDRESS = process.env.ARANGODB_ADDRESS;
const ARANGODB_NAME = process.env.ARANGODB_NAME;
const ARANGODB_USER = process.env.ARANGODB_USER;
const ARANGODB_PASSWORD = process.env.ARANGODB_PASSWORD;

// Node Environment
const NODE_ENV = process.env.NODE_ENV;

// Permitted Access Addresses
const ORIGIN_WEBAPP = process.env.ORIGIN_WEBAPP;

// Identity Service Provider Information
const COGNITO_POOL_ID = process.env.COGNITO_POOL_ID;
const AWS_REGION = process.env.AWS_REGION;

module.exports = {
    PORT,
    ARANGODB_ADDRESS,
    ARANGODB_NAME,
    ARANGODB_USER,
    ARANGODB_PASSWORD,
    NODE_ENV,
    ORIGIN_WEBAPP,
    COGNITO_POOL_ID,
    AWS_REGION
};