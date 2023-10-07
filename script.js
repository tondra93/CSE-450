// Import the functions you need from the SDKs you need
const { data } = require("autoprefixer");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  listAll,
  ref,
  getDownloadURL,
} = require("firebase/storage");
const { get } = require("http");
const mongoose = require("mongoose");
const { setInterval } = require("timers/promises");
// const imageModel = require("./lib/models/images");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBzupg6ia6rl5tDHQl7jcBVcNt1l1tmLTY",
//   authDomain: "react-firebase-integrati-78983.firebaseapp.com",
//   projectId: "react-firebase-integrati-78983",
//   storageBucket: "react-firebase-integrati-78983.appspot.com",
//   messagingSenderId: "1084044672702",
//   appId: "1:1084044672702:web:a9e4421638c42cbebc28ef",
//   measurementId: "G-2TL1QHQR8X",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBJRAcUmIp50LYKem7tEkGjEwTCnvGlvQ4",
  authDomain: "thesis-4daf3.firebaseapp.com",
  projectId: "thesis-4daf3",
  storageBucket: "thesis-4daf3.appspot.com",
  messagingSenderId: "919213827023",
  appId: "1:919213827023:web:61246a4e09da9c8fce68ba",
  measurementId: "G-CJTYBQERZ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const storageRef = ref(storage);
// listAll(storageRef)
//   .then((res) => {
//     return res.prefixes.map((folderRef) => {
//       return folderRef.name;
//     });
//   })
//   .then((res) => {
//     console.log(res);
//   });

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    max: 100,
  },
  imageType: {
    type: String,
    max: 100,
  },
});

const imageModel =
  mongoose.models.images || mongoose.model("images", imageSchema);

mongoose
  .connect(
    "mongodb+srv://nahian93:cyberspace@cluster0.nztbpjo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((connection) => {
    console.log("Connected to database!");
    listAll(storageRef).then((res) => {
      res.prefixes.map((folderRef) => {
        listAll(folderRef).then((folder) => {
          folder.items.map((itemRef) => {
            setInterval(
              1000,
              getDownloadURL(itemRef).then((url) => {
                // console.log(url);
                const image = {
                  imageUrl: url,
                  imageType: folderRef.name,
                };
                imageModel.create(image).then((result) => {
                  console.log(result);
                  // return result;
                });
                // console.log(image);
                // return image;
              })
            );
          });
        });
      });
    });
  });
