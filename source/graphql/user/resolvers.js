const UserService = require("../../services/userservice");


const resolvers = {
  Query: {
    signIn: async (_, {email, password}) => {
      const token = await UserService.getUserToken({
        email: email,
        password: password,
      });
      return token;
    },
    getCurrLoggedInUser: async (_, __, context) => {
      if (context && context.currentUser) {
        const user = await UserService.getUserById(context.currentUser.id);
        console.log(user);
        return user;
      }
      throw new Error("Somethings wrong!");
    },
  },
  
  Mutation: {
    signUp: async(_, {firstName, lastName, email, password}) => {
      const res = await UserService.createUser(firstName, lastName, email, password);
      return `id: ${res.id}`;
    },
  }
};

module.exports = { resolvers };
