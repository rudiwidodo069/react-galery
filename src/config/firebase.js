import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDDEglc8dXfItv9uTE2HIOonJ8X-V8HNQo",
    authDomain: "react-galery.firebaseapp.com",
    databaseURL: "https://react-galery.firebaseio.com",
    projectId: "react-galery",
    storageBucket: "react-galery.appspot.com",
    messagingSenderId: "135667827264",
    appId: "1:135667827264:web:791a39f1632d27310995a5",
    measurementId: "G-2DXEV5TJVE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDatabase = firebase.database();
const firebaseStorage = firebase.storage();

export {
    firebaseDatabase,
    firebaseStorage
}