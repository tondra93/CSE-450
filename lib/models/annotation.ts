import mongoose, { Schema } from "mongoose";

const annotationSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    imageText: {
      type: String,
    },
    classLabel: {
      type: String,
    },
    targetAudience: {
      type: String,
    },
    relevance: {
      type: Number,
    },
    // annotator: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    // },
    // lastAnnotated:{}
  },
  { strict: false }
);

const AnnotationModel =
  mongoose.models.annotations ||
  mongoose.model("annotations", annotationSchema);

export default AnnotationModel;
