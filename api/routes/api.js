const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: 'secret',
  userProperty: 'payload'
});

// controllers
const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');
const ctrlBlog = require('../controllers/blog');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/user/:id', auth, ctrlProfile.getUserById);
router.post('/follow/:id', auth, ctrlProfile.follow);
router.delete('/follow/:id', auth, ctrlProfile.unfollow);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// blog
router.post('/publish', ctrlBlog.publish);
router.get('/post', ctrlBlog.getAllBlogPosts);
router.get('/post/:id', ctrlBlog.getBlogPostById);
router.get('/post/user/:userId', ctrlBlog.getAllBlogPostsByUserId);
router.get('/post/followed/:id', ctrlBlog.getFollowedBlogPosts);
router.get('/post/category/:category', ctrlBlog.getBlogPostByCategory);

module.exports = router;
