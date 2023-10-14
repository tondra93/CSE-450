import { NextPage } from "next";
import { useEffect, useState } from "react";

import { getDownloadURL, listAll, ref } from "firebase/storage";
import axios from "axios";
// import { storage } from "../../lib/src/firebase";
// import AdminNavbar from "../../components/adminNavbar";
import useSWR from "swr";
import Image from "next/image";
import { Button } from "@mantine/core";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import AnnotationSingle from "../components/image/annotationSingle";
import AnnotatorNavbar from "../components/annotatorNavbar";

const LoadData: NextPage = () => {
  const [imageUrl, setImageUrl] = useState();
  const [imageList, setImageList] = useState([]);
  const [curIdx, setCurIdx] = useState(0);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    // setCurIdx(parseInt(lastIdx));
  }, []);
  // const imageListRef = ref(storage, "/");

  // const getLastAnnotated = async () => {

  // };

  const getUserMappedFolder = async () => {
    try {
      const response = await axios.get("/api/dataset/get-images", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.images?.map((e) => e?.imageUrl));
      setImageList(response.data.images?.map((e) => e?.imageUrl));
      // console.log(response.data.images);
      // console.log(response.data.annotationFolder);
      // const storageRef = ref(storage, response.data.annotationFolder);
      // listAll(storageRef).then((res) => {
      //   res.items.forEach((item) => {
      //     getDownloadURL(item).then((url) => {
      //       setImageList((prev: any) => {
      //         const newState: any = [...prev];
      //         newState.push(url);
      //         return newState;
      //       });
      //     });
      //   });
      // });
    } catch (e) {
      console.log(e);
    }
    // const response = await useSWR("/api/load-data");
  };

  const nextPage = () => {
    setCurIdx((prev) => {
      return Math.min(imageList.length - 1, prev + 1);
    });
  };

  const prevPage = () => {
    setCurIdx((prev) => {
      return Math.max(0, prev - 1);
    });
  };

  useEffect(() => {
    getUserMappedFolder();
  }, []);

  // useEffect(() => {
  //   listAll(imageListRef).then((res) => {
  //     res.prefixes.forEach((folderRef) => {
  //       listAll(folderRef).then((res) => {
  //         res.items.forEach((item) => {
  //           getDownloadURL(item).then((url) => {
  //             setImageList((prev: any) => {
  //               const newState: any = [...prev];
  //               newState.push(url);
  //               return newState;
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });

  // getDownloadURL(imageListRef).then((url) => {
  //     console.log(url);
  //     setImageUrl(url);

  //   })
  // }, []);

  const uploadDatabase = async () => {
    const res = await axios.post("/api/load-data", {
      url: imageUrl,
    });
    console.log({ res });
    setPhoto(res.data.data.photo_url);
  };
  return (
    <AnnotatorNavbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          rowGap: "20px",
        }}
      >
        {/* <button onClick={uploadDatabase}>upload</button>

        {imageList.map((e) => {
          return <Image alt="pic" src={e} height={500} width={500} />;
        })} */}
        {imageList.length && parseInt(curIdx) < imageList.length && (
          <AnnotationSingle
            imageUrl={imageList[curIdx]}
            nextPage={nextPage}
            lastIdx={curIdx}
          />
        )}
        {/* <AnnotationSingle /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "10px",
          }}
        >
          <Button
            leftIcon={<ArrowLeft />}
            onClick={() => {
              prevPage();
            }}
          >
            Previous
          </Button>

          <Button
            rightIcon={<ArrowRight />}
            onClick={() => {
              nextPage();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </AnnotatorNavbar>
  );
};

export default LoadData;
