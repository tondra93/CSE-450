import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
import Stats from "../../lib/models/stats";
import {
  FIND_ANNOTATORS,
  FIND_ONE_SENTENCE,
  GET_STATS_TABLE_INFO,
} from "../../lib/server/queries";
import fs from "fs";
import AnnotationModel from "../../lib/models/annotation";
export default async function handler(req, res) {
  // const { id, numberOfWords } = req.body;
  await connectDb();
  try {
    console.log("Hello");
    
    const data = await AnnotationModel.find({});

    const stringData =  JSON.stringify(data, null, 2);
    fs.writeFile('annotatedData', stringData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('JSON data has been written to');
      }
    });
    res.json({ data });
  } catch (err) {
    res.json({ err });
  }
}
