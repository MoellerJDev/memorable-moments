const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const app = express();
const port = process.env.PORT || 5000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //context: authMiddleware,
  });

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/memorable_moments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function (error) {
  console.log('Mongoose Connection Error : ' + error);
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
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
  startApolloServer(typeDefs, resolvers);