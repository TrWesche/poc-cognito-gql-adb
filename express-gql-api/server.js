// General Imports
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const { PORT } = require("./config");

// GraphQL Endpoint Handling Imports
const { graphqlHTTP } = require("express-graphql");

// GraphQL Schema Generation Imports
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefinition = require("./type_gql/_types.all");
const resolverDefinition = require("./resolver_gql/_resolvers.all");
const schema = makeExecutableSchema({
  typeDefs: typeDefinition,
  resolvers: resolverDefinition
});

// ArangoDB Repository Action Imports
const {
  PostRepo
} = require("./repository_adb/_repository.all");

// Authorization System Imports
const { processAccessToken } = require('./middleware/authorization');

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(morgan('dev'));

// app.use(cookieParser());
// app.use(processJWT);

app.use(processAccessToken);

app.use(
  '/graphql',
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    rootValue: request,
    graphiql: true,
    context: {
      PostRepo,
      response
    }
  }))
);

const server = app.listen(PORT, () => {
  console.log(`\
    🚀 Server ready at on port ${PORT}
  `);
});

module.exports = app;