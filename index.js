const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const { createApolloGraphqlServer } = require("./source/graphql/index");
const UserService = require("./source/services/userservice");

const startMediaServer = async() =>{
    const app = express();
    const PORT = process.env.PORT || 8001;

    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) => { 
        res.json({ message: "Server is running" });
    });
    
    app.use(
        "/graphql",
        expressMiddleware(await createApolloGraphqlServer(), {
          context: async ({ req }) => {
            const token = req.headers["token"];
    
            try {
              const currentUser = UserService.decodingJWTToken(token);
              return { currentUser };
            } catch (error) {
              return {}; 
            }
          },
        })
      );
    
    
    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
}

startMediaServer();