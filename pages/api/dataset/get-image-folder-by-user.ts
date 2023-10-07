import connectDb from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import userAnnotationModel from "../../../lib/models/user-annotation";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../lib/src/firebase";
import mongoose from "mongoose";

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

    const images = await userAnnotationModel.aggregate([
      {
        $lookup: {
          from: "images",
          localField: "annotationFolder",
          foreignField: "imageType",
          as: "images",
        },
      },
      // {
      //   $unwind: {
      //     path: "$images",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $match: {
          user: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          images: 1,
        },
      },
    ]);

    // console.log(images);

    // const prom = new Promise((resolve, reject) => {
    //   const folderRef = ref(storage, folder.annotationFolder);

    //   listAll(folderRef)
    //     .then((res) => {
    //       const fileurls = res.items.map((itemRef) => {
    //         return getDownloadURL(itemRef);
    //       });
    //       return Promise.all(fileurls);
    //     })
    //     .then((res) => {
    //       resolve(res);
    //     })
    //     .catch((e) => {
    //       reject(e);
    //     });
    // });

    // const fileurls = await prom;
    // console.log(fileurls);
    // console
    // res.end();
    res.json({
      status: "success",
      images: images[0].images.map((e) => e.imageUrl),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}
