import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
