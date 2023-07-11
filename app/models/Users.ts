import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  integral: Number,
  todayRank: Number,
  totalRank: Number,
});

const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);

export default Users;
