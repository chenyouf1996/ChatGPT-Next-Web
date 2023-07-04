import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default async function handler(req, res) {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (req.method === "GET") {
    const users = await User.find();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  }
  db.disconnect();
}
