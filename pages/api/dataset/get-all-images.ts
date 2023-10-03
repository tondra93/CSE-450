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
    listAll(storageRef)
      .then((res) => {
        res.prefixes.forEach((prefixref) => {
          listAll(prefixref).then((items) => {
            items.items
            
          });
        });
        // return Promise.all(urls);
      })
      .then((res) => {
        // console.log(res);
        // res.
      });

    // const fileurls = await prom;
    // console.log(fileurls);
    // console
    // res.end();
    res.json({
      status: "success",
      //   fileurls,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}
