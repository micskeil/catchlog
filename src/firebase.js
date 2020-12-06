import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBMcAaU42QOoiUFcW_SidKxHg7JtbOQ-f8",
  authDomain: "fishlog-75884.firebaseapp.com",
  databaseURL: "https://fishlog-75884.firebaseio.com",
  projectId: "fishlog-75884",
  storageBucket: "fishlog-75884.appspot.com",
  messagingSenderId: "831395729631",
  appId: "1:831395729631:web:193cb736a420dfed0e996a",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
