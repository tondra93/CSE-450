import { listAll, ref } from "firebase/storage";
import { storage } from "../src/firebase";
import userAnnotationModel from "../models/user-annotation";

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

export default mapUserToFolder;
