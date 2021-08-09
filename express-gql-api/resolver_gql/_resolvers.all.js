const types = require('./types');
const fields = require('./fields');
const queries = require('./queries');
const mutations = require('./mutations');
const subscriptions = require('./subscriptions');

const resolvers = Object.assign({},
    types,
    fields,
    queries, 
    mutations, 
    subscriptions
);

module.exports = resolvers;