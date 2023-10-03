import connectDb from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import userAnnotationModel from "../../../lib/models/user-annotation";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../lib/src/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    // const { user } = req.body;
    const storageRef = ref(storage);

    const prom = new Promise((resolve, reject) => {
      var files = [];
      listAll(storageRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            listAll(folderRef).then((res) => {
              res.items.forEach((res) => {
                getDownloadURL(res).then((res) => {
                  files.push(res);
                });
              });
            });
          });
        })
        .then((res) => {
          resolve(files);
        })
        .catch((e) => {
          reject(e);
        });
    });

    var files = await prom;

    console.log(files);
    // const fileurls = await prom;
    // console.log(fileurls);
    // console
    // res.end();
    res.json({
      status: "success",
      files,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}
