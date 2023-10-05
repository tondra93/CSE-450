import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../lib/src/firebase";
import imageModel from "../../../lib/models/images";

export default async function (req, res) {
  const listRef = ref(storage);
  var image_urls = [];
  listAll(listRef)
    .then((res) => {
      // console.log(prefix)
      return res.prefixes.forEach((prefix) => {
        listAll(prefix).then((images) => {
          return images.items.forEach((image) => {
            getDownloadURL(image).then((url) => {
              console.log(url);
              return imageModel.create({
                url: url,
                imageType: prefix,
              });
            });
          });
        });
      });
    })
    .then(() => {
      res.json({
        message: "success",
      });
    })
    .catch((e) => {
      res.json({
        message: "error",
        error: e.message,
      });
    });
}
