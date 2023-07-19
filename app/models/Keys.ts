import mongoose from "mongoose";

const KeysSchema = new mongoose.Schema({
  key: String,
  type: String,
  expireDate: String,
});

const Keys = mongoose.models.Keys || mongoose.model("Keys", KeysSchema);

export default Keys;
