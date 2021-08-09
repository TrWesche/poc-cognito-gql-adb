// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
// https://betterprogramming.pub/secure-aws-api-gateway-with-amazon-cognito-and-aws-lambda-535e7c9ffea1

/** Help function(s) for handling accessTokens for identity service providers. */
const { cognitoHandler } = require("../helpers/cognitoDecodeVerifyJWT");

/** Middleware: Add JWT to the request body if exists. */
function processAccessToken(req, res, next) {
    try {
        console.log(req['Authorization']);
        if (req['Authorization']) {
            console.log("Request received with header")
            const accessToken = cognitoHandler(req);
            req.accessToken = accessToken;
        }
        return next();
    } catch (err) {
        return next();
    }
};

module.exports = {
    processAccessToken
};