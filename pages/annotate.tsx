import { NextPage } from "next";
import { useEffect, useState } from "react";
import { storage } from "../lib/src/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import axios from "axios";

const Annotate: NextPage = ( ) => {
 // console.log(imageUrl);
  //   console.log(imageUrl);
  //   const [imageUrl, setImageUrl] = useState();
  //   const [photo, setPhoto] = useState();
  //   const [imagePromises, setImagePromises] = useState([]);

  //   const imageListRef = ref(storage, "/data3");

  //   const uploadDatabase = async () => {
  //     const res = await axios.post("/api/load-data", {
  //       url: imageUrl,
  //     });
  //     console.log({ res });
  //     setPhoto(res.data.data.photo_url);
  //   };
  return (
    <>
      {/* <button onClick={uploadDatabase}>upload</button> */}
      {/* <img src={imageUrl} alt="photo" /> */}
      Hello World
    </>
  );
};

export default Annotate;
