import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

const salt = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  verified: { type: Boolean, default: false }
});

userSchema.pre("save", function(next) {
  const password = bcrypt.hashSync(this.password, salt);
  this.password = password;
  next();
});

userSchema.methods.hashedAnswer = function hashedAnswer(answer) {
  answer = answer.toLowerCase();
  return bcrypt.hashSync(answer, salt);
};

// mongoose methods do not support es6 yet. so stick to 'function'
userSchema.methods.isValidPassword = function isValidPassword(password) {
  // will return bool
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.isValidAnswer = function isValidAnswer(answer) {
  // will return bool
  return bcrypt.compareSync(answer, this.answer);
};

userSchema.methods.generateJwt = function generateJwt() {
  return jwt.sign(
    {
      username: this.username,
      verified: this.verified
    },
    process.env.JWT_SECRET
  );
};

userSchema.methods.loginResponse = function loginResponse() {
  return {
    username: this.username,
    verified: this.verified,
    token: this.generateJwt()
  };
};

userSchema.methods.verifyUsernameResponse = function verifyUsernameResponse() {
  return {
    username: this.username,
    question: this.question,
    verified: true
  };
};

userSchema.plugin(uniqueValidator, {
  message: "This username is already taken"
});

export default mongoose.model("User", userSchema);
