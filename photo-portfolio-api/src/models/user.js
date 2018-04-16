import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const salt = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  question: {type: String, required: true},
  answer: {type: String, lowercase: true, required: true}
});

userSchema.pre('save', function(next) {
  const password = bcrypt.hashSync(this.password, salt);
  this.password = password;
  const answer = bcrypt.hashSync(this.answer, salt);
  this.answer = answer;
  next();
});

// mongoose methods do not support es6 yet. so stick to 'function'
userSchema.methods.isValidPassword = function isValidPassword(password) {
  // will retur bool
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function generateJwt() {
  return jwt.sign({
    username: this.username
  }, process.env.JWT_SECRET);
}

userSchema.methods.authJsonRes = function authJsonRes() {
  return {
    username: this.username,
    token: this.generateJwt()
  }
} 

export default mongoose.model('User', userSchema);