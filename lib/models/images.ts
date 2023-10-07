import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    max: 100,
  },
  imageType: {
    type: String,
    max: 100,
  },
});

const imageModel =
  mongoose.models.images || mongoose.model("images", imageSchema);

export default imageModel;
