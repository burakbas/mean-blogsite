const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports.publish = function(req, res) {

  const post = new Post();

  post.authorId = req.body.authorId;
  post.authorName = req.body.authorName;
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
