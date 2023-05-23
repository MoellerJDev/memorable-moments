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
    addUser: async (parent, args) => {
      args.password = await bcrypt.hash(args.password, 12);
      
      let user = new User(args);
      user = await user.save();
  
      const token = jwt.sign({ id: user._id }, 'yourSecretKey');
  
      return { token, user };
    },
    updateUser: async (parent, args) => {
      const user = await User.findByIdAndUpdate(args.id, args, {new: true});
      return user;
    },
    deleteUser: async (parent, args) => {
      const user = await User.findByIdAndRemove(args.id);
      return user;
    },
    addMemory: async (parent, args) => {
      let memory = new Memory(args);
      memory.user = args.userId;
      return await memory.save();
    },
    updateMemory: async (parent, args) => {
      const memory = await Memory.findByIdAndUpdate(args.id, args, {new: true});
      return memory;
    },
    deleteMemory: async (parent, args) => {
      const memory = await Memory.findByIdAndRemove(args.id);
      return memory;
    }
  }
};

module.exports = resolvers;
