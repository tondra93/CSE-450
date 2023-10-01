import { NextPage } from "next";
import { useEffect, useState } from "react";

import { getDownloadURL, listAll, ref } from "firebase/storage";
import axios from "axios";
import { storage } from "../../lib/src/firebase";
import AdminNavbar from "../../components/adminNavbar";

const LoadData: NextPage = () => {
  const [imageUrl, setImageUrl] = useState();
  const [imageList, setImageList] = useState([]);
  const [photo, setPhoto] = useState();
  const imageListRef = ref(storage, "/");
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.prefixes.forEach((folderRef) => {
        listAll(folderRef).then((res) => {
          res.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              // console.log(url);
              // setImages(url);
              setImageList((prev: any) => {
                const newState: any = [...prev];
                newState.push(url);
                return newState;
              });
            });
          });
        });
      });
    });

    // getDownloadURL(imageListRef).then((url) => {
    //     console.log(url);
    //     setImageUrl(url);

    //   })
  }, []);

  const uploadDatabase = async () => {
    const res = await axios.post("/api/load-data", {
      url: imageUrl,
    });
    console.log({ res });
    setPhoto(res.data.data.photo_url);
  };
  return (
    <AdminNavbar>
      <button onClick={uploadDatabase}>upload</button>
      {/* <img src={photo} alt="photo"/> */}
      {imageList.map((e) => {
        return <img src={e} alt="photo" />;
      })}
    </AdminNavbar>
  );
};

export default LoadData;
