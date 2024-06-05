const queries = `
    searchUsers(searchText: String!): [User!]!
    followers(userId: Int!): [User!]!
    following(userId: Int!): [User!]!
`;

module.exports = { queries };
