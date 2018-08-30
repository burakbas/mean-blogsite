const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = function (req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function (err, user) {
        res.status(200).json(user);
      });
  }

};

module.exports.getUserById = function (req, res) {

  User
    .findById(req.params.id)
    .exec(function (err, user) {
      res.status(200).json(user);
    });

};

module.exports.follow = function (req, res) {
  // First, find the following user account
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    user.followers.push(req.payload._id);
    user.save(function (err) {
      if (err) {
        res.status(404).json(err);
      } else {
        // Secondly, find the user account for the logged in user
        User.findById(req.payload._id, function (err, user) {
          if (err) {
            res.status(404).json(err);
            return;
          }
          user.following.push(req.params.id);
          user.save(function (err) {
            if (err) {
              res.status(404).json(err);
            } else {
              //send success response
              res.status(200);
              res.send('Followed!');
            }
          });
        });
      }
    });
  });
};

module.exports.unfollow = function (req, res) {
  // First, find the following user account
  User.findById(req.params.id, function (err, user) {
    user.followers.remove(req.payload._id);
    user.save(function (err) {
      if (err) {
        res.status(404).json(err);
      } else {
        // Secondly, find the user account for the logged in user
        User.findById(req.payload._id, function (err, user) {
          user.following.remove(req.params.id);
          user.save(function (err) {
            if (err) {
              res.status(404).json(err);
            } else {
              //send success response
              res.status(200);
              res.send('Unfollowed!');
            }
          });
        });
      }
    });
  });
};
