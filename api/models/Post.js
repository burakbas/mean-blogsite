const mongoose = require( 'mongoose' );

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  private: {
    type: String,
    default: "false",
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

mongoose.model('Post', postSchema);

