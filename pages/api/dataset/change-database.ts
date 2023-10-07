import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../lib/src/firebase";
import imageModel from "../../../lib/models/images";

export default async function (req, res) {
  const listRef = ref(storage);
  var image_urls = [];
  image_urls = await listAll(listRef).then((res) => {
    // console.log(prefix)
    const promises = res.prefixes.map((prefix) => {
      return listAll(prefix).then(async (images) => {
        const promises = images.items.map(async (image) => {
          return getDownloadURL(image);
        });
        const images_ = await Promise.all(promises);

        // const imagess = images_.map((image) => {
        //   return {
        //     imageUrl: image,
        //     imageType: prefix.name,
        //   };
        // });
        return images_;
        // console.log(imagess);
        // return await imageModel.insertMany(imagess);
      });
    });
    return Promise.all(promises);
  });
  image_urls = image_urls.flat();
  // console.log(image_urls.length);
  // const image = await imageModel.create({
  //   imageUrl: image_urls[0].imageUrl,
  //   imageType: image_urls[0].imageType,
  // });

  const images = await imageModel.insertMany(image_urls);
  // console.log(images);
  res.json(image_urls);
}
