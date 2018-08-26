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
    if (err) console.log(err);
    // saved!
    res.status(200);
    res.end('Post successfully saved.');
  });

};
