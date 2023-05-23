import { ApolloClient, InMemoryCache } from '@apollo/client';

const port = process.env.REACT_APP_SERVER_PORT || 5000; // Read the port from .env file, defaulting to 5000

const client = new ApolloClient({
  uri: `http://localhost:${port}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
