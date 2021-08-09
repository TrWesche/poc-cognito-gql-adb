const gql = require('graphql-tag');

const typedef = gql`
    type Mutation {
        createPost(data: CreatePostInput!): Post!
        updatePost(post_key: ID!, data: UpdatePostInput!): Post!
        deletePost(post_key: ID!): Post!
    }
`;

module.exports = typedef;