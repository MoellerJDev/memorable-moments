const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError, ValidationError } = require('../utils/errors');
const { body, validationResult } = require('express-validator');

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
    addUser: [
      async (parent, args) => {
        try {
          // Validate inputs
          const errors = validationResult(args);
          if (!errors.isEmpty()) {
            throw new ValidationError(errors.array());
          }

          // Hash the password
          args.password = await bcrypt.hash(args.password, 12);

          let user = new User(args);
          user = await user.save();

          const token = jwt.sign({ id: user._id }, process.env.secretKey);

          return { token, user };
        } catch (error) {
          throw error;
        }
      },
      [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').notEmpty().isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      ],
    ],
    updateUser: [
      async (parent, args, { user }) => {
        try {
          // Validate inputs
          const errors = validationResult(args);
          if (!errors.isEmpty()) {
            throw new ValidationError(errors.array());
          }

          const existingUser = await User.findById(args.id);
          if (!existingUser) {
            throw new Error('User not found');
          }

          if (existingUser._id.toString() !== user.id) {
            throw new AuthenticationError('You are not authorized to update this user');
          }

          const updatedUser = await User.findByIdAndUpdate(args.id, args, { new: true });
          return updatedUser;
        } catch (error) {
          throw error;
        }
      },
      [
        body('username').optional().notEmpty().withMessage('Username is required'),
        body('email').optional().notEmpty().isEmail().withMessage('Valid email is required'),
        body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      ],
    ],
    deleteUser: [
      async (parent, args, { user }) => {
        try {
          const existingUser = await User.findById(args.id);
          if (!existingUser) {
            throw new Error('User not found');
          }

          if (existingUser._id.toString() !== user.id) {
            throw new AuthenticationError('You are not authorized to delete this user');
          }

          const deletedUser = await User.findByIdAndRemove(args.id);
          return deletedUser;
        } catch (error) {
          throw error;
        }
      },
    ],
    addMemory: [
      async (parent, args) => {
        try {
          // Validate inputs
          const errors = validationResult(args);
          if (!errors.isEmpty()) {
            throw new ValidationError(errors.array());
          }

          let memory = new Memory(args);
          memory.user = args.userId;
          return await memory.save();
        } catch (error) {
          throw error;
        }
      },
      [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').optional(),
        body('imageUrl').optional(),
        body('userId').notEmpty().withMessage('User ID is required'),
      ],
    ],
    updateMemory: [
      async (parent, args) => {
        try {
          // Validate inputs
          const errors = validationResult(args);
          if (!errors.isEmpty()) {
            throw new ValidationError(errors.array());
          }

          const existingMemory = await Memory.findById(args.id);
          if (!existingMemory) {
            throw new Error('Memory not found');
          }

          const updatedMemory = await Memory.findByIdAndUpdate(args.id, args, { new: true });
          return updatedMemory;
        } catch (error) {
          throw error;
        }
      },
      [
        body('title').optional().notEmpty().withMessage('Title is required'),
        body('description').optional(),
        body('imageUrl').optional(),
      ],
    ],
    deleteMemory: [
      async (parent, args) => {
        try {
          const existingMemory = await Memory.findById(args.id);
          if (!existingMemory) {
            throw new Error('Memory not found');
          }

          const deletedMemory = await Memory.findByIdAndRemove(args.id);
          return deletedMemory;
        } catch (error) {
          throw error;
        }
      },
    ],
  },
};

module.exports = resolvers;
