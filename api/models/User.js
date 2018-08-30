const mongoose = require( 'mongoose' );
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  following: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'User' }],
  followers: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'User' }]
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name
  }, 'secret', { expiresIn: '168h' }); // one week
};

mongoose.model('User', userSchema);
