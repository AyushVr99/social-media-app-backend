const { ApolloServer } = require("@apollo/server");
const { User } = require("./user");
const { findandfollow } = require("./findandfollow");
const { viewcontent } = require("./viewcontent");

const createApolloGraphqlServer = async () => {
  const gqlserver = new ApolloServer({
    typeDefs: `
            ${User.typeDefs}
            ${findandfollow.typeDefs}
            ${viewcontent.typeDefs}
            type Query{
              ${User.queries} 
              ${findandfollow.queries}
              ${viewcontent.queries}
            }
            type Mutation {
              ${User.mutations}
              ${findandfollow.mutations}
              ${viewcontent.mutations}
            }
          `,
    resolvers: {
      Query: {
        ...User.resolvers.Query,
        ...findandfollow.resolvers.Query,
        ...viewcontent.resolvers.Query
      },
      Mutation: {
        ...User.resolvers.Mutation,
        ...findandfollow.resolvers.Mutation,
        ...viewcontent.resolvers.Mutation
      }
    },
    introspection: true,
  });
  await gqlserver.start();
  return gqlserver;
}

module.exports = { createApolloGraphqlServer };

