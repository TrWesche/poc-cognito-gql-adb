const gql = require('graphql-tag');

const typedef = gql`
    enum MutationType {
        CREATED
        UPDATED
        DELETED
    }
`;

module.exports = typedef;