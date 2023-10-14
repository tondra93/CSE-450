import AnnotationModel from "../../../lib/models/annotation";
import User from "../../../lib/models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const annotation = await AnnotationModel.create(req.body);

  const token = req.headers.authorization.split(" ")[1];

  const data = jwt.verify(token, process.env.JWT_SECRET);
  const userId = data.id;

  // await User.findByIdAndUpdate(
  //   userId,
  //   {
  //     lastAnnotated: annotation._id,
  //   },
  //   {
  //     new: true,
  //   }
  // );
  res.json({
    status: "success",
    annotation,
  });
}
