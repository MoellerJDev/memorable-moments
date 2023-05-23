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
    addUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): User
    addMemory(title: String!, description: String, imageUrl: String, userId: ID!): Memory
    updateMemory(id: ID!, title: String, description: String, imageUrl: String, userId: ID): Memory
    deleteMemory(id: ID!): Memory
  }
`;

module.exports = typeDefs;
