const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Memory = require('../models/Memory');

const resolvers = {
  Query: {
    users: async () => await User.find().populate('memories'),
    memories: async () => await Memory.find().populate('user'),
    user: async (parent, args) => await User.findById(args.id).populate('memories'),
    memory: async (parent, args) => await Memory.findById(args.id).populate('user'),
  },
  Mutation: {
    registerUser: async (parent, args) => {
      // Hash the password before storing it
      args.password = await bcrypt.hash(args.password, 12);
      
      let user = new User(args);
      user = await user.save();
  
      // Create a JWT for the user
      const token = jwt.sign({ id: user._id }, 'yourSecretKey');
  
      return { token, user };
    },
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
  
      if (!user) {
        throw new Error('No such user found');
      }
  
      const valid = await bcrypt.compare(args.password, user.password);
  
      if (!valid) {
        throw new Error('Invalid password');
      }
  
      const token = jwt.sign({ id: user._id }, 'yourSecretKey');
  
      return { token, user };
    },
    addUser: async (parent, args) => {
      let user = new User(args);
      return await user.save();
    },
    addMemory: async (parent, args) => {
      let memory = new Memory(args);
      memory.user = args.userId;
      return await memory.save();
    },
  }
};

module.exports = resolvers;
