// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// const User = mongoose.models.User || mongoose.model("User", UserSchema);

// export default async function handler(req, res) {
//   const db = await mongoose.connect("mongodb://127.0.0.1:27017/chatgpt", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   if (req.method === "DELETE") {
//     const { id } = req.query;
//     await User.findByIdAndDelete(id);
//     res.status(204).end();
//   }
//   db.disconnect();
// }
