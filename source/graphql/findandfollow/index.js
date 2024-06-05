const { typeDefs } = require("./typedef");
const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");

const findandfollow = { typeDefs, queries, mutations, resolvers };

module.exports = { findandfollow };
