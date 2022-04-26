const { checkPassword, hashPassword } = require('../helpers/hashPassword');

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../model');

class UserController {
  static register(req, res, next) {
    let { username, password } = req.body;
    let hashed = hashPassword(password);
    let newUser = { username, password: hashed };

    // check if user exists
    User.findOne({ username })
      .then((user) => {
        if (user) {
          res.status(400).json({
            message: 'Register Failed!',
            message: 'User already exists',
          });
        } else {
          User.create(newUser)
            .then((newUser) => {
              let payload = {
                username: newUser.username,
              };
              let access_token = jwt.sign(payload, `${process.env.SECRET}`);
              res.status(201).json({
                message: 'Register Success!',
                username: newUser.username,
                access_token,
                createdAt: newUser.createdAt,
              });
            })
            .catch((err) => {
              next(err);
            });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    let { username, password } = req.body;
    // user find one where user = username
    // checking password
    User.findOne({ username })
      .then((user) => {
        if (user) {
          if (checkPassword(password, user.password)) {
            let payload = {
              username: user.username,
            };
            let access_token = jwt.sign(payload, `${process.env.SECRET}`);
            res.status(200).json({
              message: 'Login Success!',
              username: user.username,
              access_token,
            });
          } else {
            res.status(400).json({
              message: 'Login Failed!',
              message: 'invalid username/password!',
            });
          }
        } else {
          res.status(400).json({
            message: 'Login Failed!',
            message: 'user does not exists!',
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    let payload = {
      username: req.body.username,
      password: hashPassword(req.body.password),
    };
    //user update where id = id then update
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { username: payload.username, password: payload.password } },
      { new: true }
    )
      .then((user) => {
        res
          .status(200)
          .json({ message: 'Change successful', updatedAt: user.updatedAt });
      })
      .catch((err) => {
        next(err);
      });
  }

  static delete(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then((user) => {
        if (user) {
          res.status(200).json({
            message: `User is deleted`,
          });
        } else {
          res.status(404).json({
            message: `Username does not exists`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
