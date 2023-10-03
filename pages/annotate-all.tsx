import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../lib/src/firebase";
import Annotate from "../components/annotate";

export default function AnnotationList() {
  const [imageUrls, setImageUrls] = useState([]);
  const getImageRefs = async (prefix) => {
    const storageRef = ref(storage, prefix);
    listAll(storageRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((fileUrl) => {
          setImageUrls((prev) => [...prev, fileUrl]);
        });
      });
    });
  };

  useEffect(() => {
    getImageRefs("/data3");
    console.log(imageUrls);
  }, []);

  return (
    <>
      {imageUrls.map((imageUrl) => {
        return <Annotate imageUrl={imageUrl} />;
      })}
    </>
  );
}
