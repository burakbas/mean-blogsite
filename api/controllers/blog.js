const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

module.exports.publish = function(req, res) {

  const post = new Post();

  post.userId = req.body.userId;
  post.userName = req.body.userName;
  post.title = req.body.title;
  post.text = req.body.text;
  post.category = req.body.category;
  post.private = req.body.private;
  post.created = req.body.created;

  post.save(function (err) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    // saved!
    res.status(200);
    res.send('Post successfully saved.');
  });

};

module.exports.getAllBlogPosts = function(req, res) {

  Post.find({}, function (err, post) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.send(post);
  });

};

module.exports.getBlogPostById = function(req, res) {

  Post.findById(req.params.id, function (err, post) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.send(post);
  });

};

module.exports.getAllBlogPostsByUserId = function(req, res) {

  Post.find({userId: req.params.userId}, function (err, post) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.send(post);
  });

};

module.exports.getFollowedBlogPosts = function(req, res) {

  let following;

  User.findById(req.params.id).exec(function (err, user) {
    following = user.following;
    Post.find({ userId : { $in : following }}, function (err, post) {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.send(post);
    });
  });

};
