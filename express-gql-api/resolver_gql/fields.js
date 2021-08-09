const post = require("./models/post");

const Field = Object.assign(
    {}, 
    post.Field, 
);

module.exports = { Field };