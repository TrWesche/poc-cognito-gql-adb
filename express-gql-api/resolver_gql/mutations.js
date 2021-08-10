const post = require("./models/post");

const Mutations = Object.assign(
    {},
    post.Mutation
);

module.exports = { Mutation: Mutations };