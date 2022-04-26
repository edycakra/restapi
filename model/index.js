const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    userID: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 6) throw new Error('Password minimal 6 characters');
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
