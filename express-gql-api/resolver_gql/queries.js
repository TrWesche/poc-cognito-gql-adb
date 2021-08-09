const post = require("./models/post");

const Query = Object.assign(
    {}, 
    post.Query
);

module.exports = { Query };