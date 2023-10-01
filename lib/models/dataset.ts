import mongoose, { Schema } from "mongoose";

const datasetSchema = new mongoose.Schema(
  {
    serial_no: { type: Number, unique: true, required: true },
    photo_url: { type: String, required: true },
    lock: { type: Boolean, required: true, default: false },
    isAnnotated: { type: Boolean, required: true, default: false },
    text:{type:String,default:null},
    genre:{type:String,default:null},
    audience:{type:String,default:null},
    rate:{type:Number,default:null},
    timestamp: { type: Date, default: Date.now },
    user_id: { type: String, ref: "User", default: null },
  },
  { strict: false }
);

const Dataset =
  mongoose.models.Dataset || mongoose.model("Dataset", datasetSchema);

export default Dataset;
