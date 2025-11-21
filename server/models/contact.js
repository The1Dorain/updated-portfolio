import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  message: String,
});

export default mongoose.model("Contact", contactSchema);
