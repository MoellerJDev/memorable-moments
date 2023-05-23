const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    memories: [Memory]
  }

  type Memory {
    id: ID!
    title: String!
    description: String
    imageUrl: String
    user: User
  }

  type Query {
    users: [User]
    memories: [Memory]
    user(id: ID!): User
    memory(id: ID!): Memory
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User
    addMemory(title: String!, description: String, imageUrl: String, userId: ID!): Memory
  }
`;

module.exports = typeDefs;
