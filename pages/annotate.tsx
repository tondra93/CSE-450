import { NextPage } from "next";
import { useEffect, useState } from "react";
import {storage} from "../lib/src/firebase";
import {getDownloadURL, listAll, ref} from "firebase/storage";
import axios from "axios";

const Annotate: NextPage = () => {
    const [imageUrl, setImageUrl] = useState();
    const[photo, setPhoto] = useState();
    const imageListRef = ref(storage,"/data3")
    console.log()
    useEffect(() => {
         listAll(imageListRef).then((res) => {
             res.items.forEach((item) => {getDownloadURL(item).then((url) => {
                 console.log(url);
                 setImageUrl(url);
                
               })})
         })

        // getDownloadURL(imageListRef).then((url) => {
        //     console.log(url);
        //     // setImageUrl(url);
            
        //   })
    },[])

    const uploadDatabase = async () =>{
        const res = await axios.post('/api/load-data',{
            url:imageUrl
        })
        console.log({res});
        setPhoto(res.data.data.photo_url);
    }
    return (<>
        <button onClick={uploadDatabase}>upload</button>
        <img src={photo} alt="photo"/>
    </>);
};

export default Annotate;
