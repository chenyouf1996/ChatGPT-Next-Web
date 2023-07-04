import mongoose from "mongoose";
import User from "../../../app/models/User";

export default async function handler(req: any, res: any) {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // if (req.method === "GET") {
  //   const users = await User.find();
  //   res.status(200).json(users);
  // }
  if (req.method === "POST") {
    const { userName, password, email } = req.body;
    const user = new User({ userName, password, email });
    await user.save();
    res.status(201).json(user);
  }
  db.disconnect();
}
