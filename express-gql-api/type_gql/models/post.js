const gql = require('graphql-tag');

const typedef = gql`
    enum PostOrderByInput {
        title_ASC,
        title_DESC,
        postedAt_ASC,
        postedAt_DESC,
        updatedAt_ASC,
        updatedAt_DESC,
        hits_ASC,
        hits_DESC,
        score_ASC,
        score_DESC
    }

    input CreatePostInput {
        title: String!
        contentPreview: String
        contentFull: String!
        published: Boolean!
        postType: ID!
        postTopic: ID!
        postTags: [ID!]
    }

    input UpdatePostInput {
        title: String
        contentPreview: String
        contentFull: String
        published: Boolean
        postTopic: ID!
        postTags: [ID!]
    }


    interface Post {
        _key: ID!
        # Live Post Content
        title: String #Public - x
        contentPreview: String #Public - x
        contentFull: String #Public - x

        # Meta Data
        postType: ID! #Public - Handle w/ 1-to-1 Join
        community: ID #Public - Handled w/ Edge Collection
        topic: ID! #Public - Handle w/ Edge Collection
        tags: [ID!] #Public - Handle w/ Edge Collection
        hits: Int! #Public - x
        score: Float #Public - x
        language: String! #Public - x - Should Use Enumeration, start with enUS
        version: Int! #Public - x

        # Content Management
        contributors: [UserPublic!]! #Public - x
        updatedAt: TimeStampUnix! #Public - x
        publishUpAt: TimeStampUnix #Public - x
        
        # Joined Content
        comments(count: Int, offset: Int, orderBy: CommentOrderByInput): [Comment!]!
    }

    type PostPublic implements Post {
        _key: ID!
        # Live Post Content
        title: String #Public - x
        contentPreview: String #Public - x
        contentFull: String #Public - x

        # Meta Data
        postType: ID! #Public - Handle w/ 1-to-1 Join
        community: ID #Public - Handled w/ Edge Collection
        topic: ID! #Public - Handle w/ Edge Collection
        tags: [ID!] #Public - Handle w/ Edge Collection
        hits: Int! #Public - x
        score: Float #Public - x
        language: String! #Public - x - Should Use Enumeration, start with enUS
        version: Int! #Public - x

        # Content Management
        contributors: [UserPublic!]! #Public - x
        updatedAt: TimeStampUnix! #Public - x
        publishUpAt: TimeStampUnix #Public - x
        
        # Joined Content
        comments(count: Int, offset: Int, orderBy: CommentOrderByInput): [Comment!]!
    }

    type PostPrivate {
        _key: ID!
        # Live Post Content
        title: String #Public - x
        contentPreview: String #Public - x
        contentFull: String #Public - x

        # Create / Update Post Content
        devTitle: String #Private - x
        devPreview: String #Private - x
        devContent: String #Private - x

        # Meta Data
        postType: ID! #Public - Handle w/ 1-to-1 Join
        community: ID #Public - Handled w/ Edge Collection
        topic: ID! #Public - Handle w/ Edge Collection
        tags: [ID!] #Public - Handle w/ Edge Collection
        hits: Int! #Public - x
        score: Float #Public - x
        language: String! #Public - x - Should Use Enumeration, start with enUS
        published: Boolean! #Private - x
        checkedOut: Boolean! #Private - x
        version: Int! #Public - x

        # Content Management
        contributors: [UserPublic!]! #Public - x
        createdAt: TimeStampUnix! #Private - x
        createdBy: UserPublic! #Private - x
        updatedAt: TimeStampUnix! #Public - x
        updatedBy: UserPublic #Private - x
        publishUpAt: TimeStampUnix #Public - x
        publishDownAt: TimeStampUnix #Private - x
        publishDownBy: UserPublic #Private - x
        checkOutAt: TimeStampUnix #Private - x
        checkOutBy: UserPublic #Private - x
        
        # Joined Content
        comments(count: Int, offset: Int, orderBy: CommentOrderByInput): [Comment!]!
    }
`;

module.exports = typedef;
