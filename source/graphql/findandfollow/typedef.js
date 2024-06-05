const typeDefs = `
      type Follows {
        id: ID!
        followerId: String!
        followingId: String!
      }
      type User {
        id: Int!
        firstName: String!
        lastName: String
        email: String!
        posts: [Post]
        following: [User]
        followers: [User]
  }
`;
module.exports = { typeDefs };
