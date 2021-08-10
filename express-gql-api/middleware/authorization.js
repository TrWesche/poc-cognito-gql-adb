// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
// https://betterprogramming.pub/secure-aws-api-gateway-with-amazon-cognito-and-aws-lambda-535e7c9ffea1

/** Help function(s) for handling accessTokens for identity service providers. */
const { cognitoHandler } = require("../helpers/cognitoDecodeVerifyJWT");

/** Middleware: Add JWT to the request body if exists. */
async function processAccessToken(req, res, next) {
    try {
        console.log(req.get('authorization') ? true : false)
        if (req.get('authorization')) {
            req.token = req.get('authorization');
            const accessToken = await cognitoHandler(req);
            req.accessAttributes = accessToken;
        }
        return next();
    } catch (err) {
        console.error(err);
        return next();
    }
};

module.exports = {
    processAccessToken
};