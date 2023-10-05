import User from "../../../lib/models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  const data = jwt.verify(token, process.env.JWT_SECRET);
  const userId = data.id;
  const user = await User.findById(userId);
  res.json(user);
}
