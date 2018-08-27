var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'secret',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlBlog = require('../controllers/blog');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// blog
router.post('/publish', ctrlBlog.publish);
router.get('/post', ctrlBlog.getAllBlogPosts);
router.get('/post/:id', ctrlBlog.getBlogPostById);
router.get('/post/user/:userId', ctrlBlog.getAllBlogPostsByUserId);

module.exports = router;
