const gql = require('graphql-tag');

const typedef = gql`
    type Query {
        posts(query: String, author_key: ID, post_key: ID, count: Int, offset: Int, orderBy: PostOrderByInput): [Post!]!
        postsPrivate(query: String, post_key: ID, published: Boolean, count: Int, offset: Int, orderBy: PostOrderByInput): [Post!]!
    }
`;

module.exports = typedef;