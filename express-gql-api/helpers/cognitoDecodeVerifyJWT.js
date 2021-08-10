// Source: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.ts

// Import Libraries
const { promisify } = require('util');
const Axios = require('axios');
const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

// Import Environment Variables
const { COGNITO_POOL_ID, AWS_REGION } = require("../config");
if (!COGNITO_POOL_ID || !AWS_REGION) {
  throw new Error('env var & aws region required for cognito pool');
}

const cognitoIssuer = `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_POOL_ID}`;


let cacheKeys = undefined;
const getPublicKeys = async () => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.default.get(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {instance: current, pem};
      return agg;
    }, {});
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

const cognitoHandler = async (request) => {
  let result = null;
  try {
    const token = request.token.split(' ');
    if (token[0] !== 'Bearer') {
      throw new Error('invated token type')
    }
    const tokenSections = (token[1] || '').split('.');
    if (tokenSections.length < 2) {
      throw new Error('requested token is invalid');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON);
    const keys = await getPublicKeys();
    const key = keys[header.kid];
    
    if (key === undefined) {
      throw new Error('claim made for unknown kid');
    }
    const claim = await verifyPromised(token[1], key.pem);
    const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error('claim is expired or invalid');
    }
    if (claim.iss !== cognitoIssuer) {
      throw new Error('claim issuer is invalid');
    }
    if (claim.token_use !== 'access') {
      throw new Error('claim use is not access');
    }
    console.log(`claim confirmed for ${claim.username}`);
    result = {userName: claim.username, clientId: claim.client_id, sub: claim.sub, clientGroups: claim['cognito:groups'], isValid: true};
  } catch (error) {
    result = {userName: '', clientId: '', sub: '', clientGroups: [''], error, isValid: false};
  }
  return result;
};

module.exports = { cognitoHandler };