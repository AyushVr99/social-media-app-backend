const queries = `
    signIn(email: String!, password: String!): String
    getCurrLoggedInUser: User

`;

module.exports = { queries };
