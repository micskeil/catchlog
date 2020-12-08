import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBMcAaU42QOoiUFcW_SidKxHg7JtbOQ-f8",
  authDomain: "fishlog-75884.firebaseapp.com",
  databaseURL: "https://fishlog-75884.firebaseio.com",
  projectId: "fishlog-75884",
  storageBucket: "fishlog-75884.appspot.com",
  messagingSenderId: "831395729631",
  appId: "1:831395729631:web:193cb736a420dfed0e996a",
};

// Initialize Firebase
export function fb() {
  firebase.initializeApp(firebaseConfig);
}

// utils
const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
