const post = require("./models/post");

const Subscriptions = Object.assign(
    {}, 
    post.Subscription
);

module.exports = { Subscription: Subscriptions };