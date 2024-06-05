const { prismaClient } = require("../../library/db");

const resolvers = {
  Query: {
    followers: async (_, { userId }) => {
      const allfollowers = await prismaClient.follows.findMany({
        where: { followingId: userId },
        include: { follower: true },
      });
      return allfollowers.map(fol => fol.follower);
    },
    following: async (_, { userId }) => {
      const allfollowing = await prismaClient.follows.findMany({
        where: { followerId: userId },
        include: { following: true },
      });
      return allfollowing.map(fol => fol.following);
    },

    searchUsers: async (_, { searchText }) => {
      return await prismaClient.user.findMany({
        where: {
          OR: [
            { firstName: { contains: searchText, mode: 'insensitive' } },
            { email: { contains: searchText, mode: 'insensitive' } },
          ],
        },
      });
    },
  },
  
  Mutation: {
    followUser: async (_, { userId }, { currentUser }) => {
      if (currentUser.id === userId) {
        throw new Error("You cannot follow yourself! Provide other user's id");
      }
      return await prismaClient.follows.create({
        data: {
          followerId: currentUser.id,
          followingId: userId,
        },
      });
    },

    unfollowUser: async (_, { userId }, { currentUser }) => {
      if (currentUser.id === userId) {
        throw new Error("You can't unfollow yourself! Provide other user's id");
      }
      const followRecord = await prismaClient.follows.findUnique({
        where: {
            followerId_followingId: {
            followerId: currentUser.id,
            followingId: userId,
          },
        },
      });
      if (!followRecord) {
        throw new Error("You are not following this user My friend!");
      }
      return await prismaClient.follows.delete({
        where: {
          id: followRecord.id,
        },
      });
    },
  }
};

module.exports = { resolvers };
