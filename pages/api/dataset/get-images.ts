import connectDb from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import userAnnotationModel from "../../../lib/models/user-annotation";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../lib/src/firebase";
import mongoose from "mongoose";
import AnnotationModel from "../../../lib/models/annotation";

interface jwtPayload {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.method != "POST") {
  //     res.status(405).end();
  //     return;
  //   }

  try {
    await connectDb();
    // const { user } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    // console.log(req.headers);
    // console.log(token);
    const data = jwt.verify(token, process.env.JWT_SECRET) as jwtPayload;
    const userId = data.id;

    // const folder = await userAnnotationModel
    //   .findOne({ user: userId })
    //   .select("annotationFolder")
    //   .exec();

    const annotations = (await AnnotationModel.find({})).map((e) => e.imageUrl);
    // console.log(annotations);
    console.log(userId);
    let images = await userAnnotationModel.aggregate([
      {
        $lookup: {
          from: "images",
          localField: "annotationFolder",
          foreignField: "imageType",
          as: "image",
        },
      },
      {
        $match: {
          user: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    images = images[0]?.image?.filter((e) => {
      return !annotations?.includes(e?.imageUrl);
    });

    res.json({
      status: "success",
      total: images.length,
      // images: images[0].images,
      images,
      // annotations,
      // images: images[0].images.map((e) => e.imageUrl),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}
