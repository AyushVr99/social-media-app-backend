const { prismaClient } = require("../../library/db");

const resolvers = {
  Query: {
    viewPost: async (_, { userId }) => {
      const followingUsers = await prismaClient.follows.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      });
      const AllfollowingIds = followingUsers.map(fol => fol.followingId);
      return await prismaClient.post.findMany({
        where: {
          userId: { in: AllfollowingIds },
        },
        include: { user: true },
      });
    },
  },
  
  Mutation: {
    createPost: async (_, { content }, { currentUser }) => {
      if (!currentUser) {
        throw new Error(" User is not authenticated!");
      }
      return await prismaClient.post.create({
        data: {
          content,
          userId: currentUser.id,
        },
        include: {
          user: true,
        },
      });
    },
    }
};

module.exports = { resolvers };
