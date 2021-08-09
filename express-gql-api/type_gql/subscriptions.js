const gql = require('graphql-tag');

const typedef = gql`
    type Subscription {
        post: PostSubscriptionPayload!
    }

    type PostSubscriptionPayload {
        mutation: MutationType!
        data: Post!
    }
`;

module.exports = typedef;