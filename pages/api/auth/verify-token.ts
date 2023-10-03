import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";
import { getStorage, ref, listAll } from "firebase/storage";
import { storage } from "../../../lib/src/firebase";
import userAnnotationModel from "../../../lib/models/user-annotation";

type Data = {
  status: String;
  message: String;
  data: any;
  isVerified: Boolean;
  folderNames: any;
};

interface jwtPayload {
  id: string;
}

const mapUserToFolder = async (user) => {
  const listRef = ref(storage);
  const userAnnodation = await userAnnotationModel.find({});

  const folderNamesPromise = new Promise((resolve, reject) => {
    const folderNames = [];
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          if (
            !userAnnodation
              .map((e) => e.annotationFolder)
              .includes(folderRef.name)
          ) {
            folderNames.push(folderRef.name);
          }
        });
      })
      .then((final) => {
        resolve(folderNames);
      })
      .catch((err) => {
        reject("Error");
      });
  });
  const folderNames = await folderNamesPromise;
  // console.log(
  //   "users",
  //   userAnnodation.map((e) => e.user.toString()).includes(user._id.toString())
  // );
  if (
    userAnnodation
      .map((e) => e.user.toString())
      .includes(user._id.toString()) == false
  ) {
    const annotationFolder =
      folderNames[Math.floor(Math.random() * folderNames?.length)];
    const newUserAnnotation = await userAnnotationModel.create({
      user: user._id,
      annotationFolder,
    });
    console.log(newUserAnnotation);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token } = req.body;
  // console.log("verifying");
  // console.log(token);
  // mapUserToFolder("hello");
  try {
    await connectDb();
    const data = jwt.verify(token, process.env.JWT_SECRET) as jwtPayload;
    console.log({ data });
    const user = await User.findById({ _id: data.id });

    console.log({ user });

    if (user) {
      res.status(200).json({
        status: "success",
        message: "user found",
        data: user,
        isVerified: true,
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
      data: {},
      isVerified: false,
    });
  }
}
