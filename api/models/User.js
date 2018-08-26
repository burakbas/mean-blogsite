var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
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
  following: [{
    _id: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    username: { type: String,  ref: 'User' }
  }],
  followers: [{
    _id: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    username: { type: String,  ref: 'User' }
  }]
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name
  }, 'secret', { expiresIn: '1h' }); // one hour
};

mongoose.model('User', userSchema);
