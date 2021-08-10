const post = require("./models/post");

const Fields = Object.assign(
    {}, 
    post.Field, 
);

module.exports = Fields;