const User = require('../model');
const jwt = require('jsonwebtoken');

authentication = (req, res, next) => {
  let decoded = jwt.verify(req.headers.access_token, `${process.env.SECRET}`);
  User.findOne({ username: decoded.username })
    .then((user) => {
      if (user) {
        req.decoded = decoded;
        next();
      } else {
        next({
          status: 400,
          name: 'Login Failed',
          message: 'user does not exists',
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { authentication };
