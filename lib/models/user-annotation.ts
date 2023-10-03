const mongoose = require("mongoose");

const userAnnotationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  annotationFolder: {
    type: String,
  },
});

const userAnnotationModel =
  mongoose.models.userAnnotations ||
  mongoose.model("userAnnotations", userAnnotationSchema);

// module.exports = userAnnotationModel;
export default userAnnotationModel;
