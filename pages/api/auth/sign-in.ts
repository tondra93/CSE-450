import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";
import createToken from "../token";
import cookie from "cookie";
import bcrypt from "bcryptjs";
import { getStorage, ref, listAll } from "firebase/storage";
import { storage } from "../../../lib/src/firebase";
import userAnnotationModel from "../../../lib/models/user-annotation";

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
  console.log(userAnnodation.map((e) => e.user.toString()));
  console.log("user", user._id);
  console.log(
    "users",
    userAnnodation.map((e) => e.user.toString()).includes(user._id.toString())
  );
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
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    await connectDb();
    const user = await User.findOne({ email });
    mapUserToFolder(user);
    // console.log(user);

    if (user) {
      const id = user._id.toString();
      if (bcrypt.compareSync(password, user.password)) {
        if (user.isActive === true) {
          const { name, role } = user;
          const token = createToken(role, id, email);
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: false,
              secure: true, //process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 360,
              sameSite: "strict",
              path: "/",
            })
          );
          res.setHeader("Access-Control-Allow-Credentials", true);

          res.json({
            data: { email, name, role, id, token },
            status: "SUCCESS",
            message: "Login Successful",
          });
        } else {
          return res.json({
            status: "FAILED",
            message:
              "Your Account is not active. Please contact with the admin.",
          });
        }
      } else {
        return res.json({
          status: "FAILED",
          message: "Email or Password error",
        });
      }
    } else {
      return res.json({ status: "FAILED", message: "Email or Password error" });
    }
  } catch (err) {
    console.log({ err });
  }
}
