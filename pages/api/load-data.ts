import { NextApiRequest, NextApiResponse } from "next";
import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body;
  console.log({url});
  
  await connectDb();
  try {
    const seq = await Dataset.count();
    console.log({ seq });

    const newData = new Dataset({
      serial_no: seq + 1,
      photo_url: url,
    });
    const data = await newData.save();
    console.log({ data });
    res.json({ data });
  } catch (err) {
    console.log({ err });
  }
}
