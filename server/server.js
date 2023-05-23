const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { authMiddleware } = require("./utils/auth");
const errorHandlingMiddleware = require('./utils/errorHandling');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // authenticate the user
        authMiddleware(req);
    
        // return the context object
        return { user: req.user };
      }
  });

  app.use(errorHandlingMiddleware);

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });
  
    db.once("open", () => {
      app.listen(port, () => {
        console.log(`API server running on port ${port}!`);
        console.log(
          `Use GraphQL at http://localhost:${port}${server.graphqlPath}`
        );
      });
    });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers).catch(error => console.error(error));
