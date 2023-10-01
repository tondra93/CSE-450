import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import Stats from "../../../lib/models/stats";
import { skippedTags } from "../../../utils/skippedTags";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { comment, photo_id, token, genre } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    await connectDb();
    console.log(Date());

 
     const response = await Dataset.updateOne(
        { _id: photo_id },
        {
          $set: {
            text: comment,
            isAnnotated: true,
            genre: genre,
            timestamp: Date(),
          },
        }
      );

    console.log({ response });
    if (response.modifiedCount === 1) {
      res.json({
        status: "SUCCESS",
        message: "Tag photo updated Successfully",
      });
    } else {
      res.json({
        status: "FAILED",
        message: "Unsuccessful Attempts",
      });
    }
  } catch (err) {
    console.log({ err });
    res.json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
}
