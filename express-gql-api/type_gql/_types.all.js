const { mergeTypeDefs } = require('@graphql-tools/merge');

// Import Models
const Enumerations = require('./enumerations');
const Types = require('./types');
const Queries = require('./queries');
const Mutations = require('./mutations');
const Subscriptions = require('./subscriptions');
const Post = require('./models/post');

const types = mergeTypeDefs([
    Types,
    Queries, 
    Mutations, 
    Subscriptions, 
    Enumerations, 
    Post
]);

module.exports = types;