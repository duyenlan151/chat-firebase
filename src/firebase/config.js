
import firebase from "firebase/app";

import 'firebase/analytics';
import 'firebase/auth'; // xác thực người dùng
import 'firebase/firestore'; // realtime database

var firebaseConfig = {
    apiKey: "AIzaSyC3Jr0Gs6HZSyPJVJqTPlHwuoCqRBhi3SE",
    authDomain: "chat-app-96ce3.firebaseapp.com",
    projectId: "chat-app-96ce3",
    storageBucket: "chat-app-96ce3.appspot.com",
    messagingSenderId: "784894681744",
    appId: "1:784894681744:web:fe33b851c2c81c17a3ae15",
    measurementId: "G-2B40XNTF83",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// </script>

const auth = firebase.auth();
const db = firebase.firestore(); // lưu trữ db

export {
    auth, db
};
export default firebase;