import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String}
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