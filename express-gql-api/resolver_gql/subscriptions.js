const post = require("./models/post");

const Subscription = Object.assign(
    {}, 
    post.Subscription
);

module.exports = { Subscription };