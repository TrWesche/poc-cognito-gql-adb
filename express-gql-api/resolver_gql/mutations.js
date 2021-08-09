const post = require("./models/post");

const Mutation = Object.assign(
    {},
    post.Mutation
);

module.exports = { Mutation };