import connectDb from "../../lib/db";
import Stats from "../../lib/models/stats";
import User from "../../lib/models/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { values } = req.body;
  console.log({ values });
  // const{name,email,password}=req.body;

  try {
    await connectDb();
    const newUser = new User({
      email: values.email,
      name: values.name,
      password: bcrypt.hashSync(values.password),
      role: "annotator",
    });
    const user = await newUser.save();
    return res.json({ user });
  } catch (err) {
    console.log({ err });

    return res.json({ err });
  }
}
