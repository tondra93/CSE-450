import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  imageType: {
    type: String,
  },
});

const imageModel =
  mongoose.models.images || mongoose.model("images", imageSchema);

export default imageModel;
