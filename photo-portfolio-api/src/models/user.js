import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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

export default mongoose.model('User', userSchema);