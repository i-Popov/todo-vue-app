import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBNn4wEXQuVz84pFeLy1RaDbhF-hqFsqgk",
    authDomain: "todos-vue-fb79a.firebaseapp.com",
    databaseURL: "https://todos-vue-fb79a.firebaseio.com",
    projectId: "todos-vue-fb79a",
    storageBucket: "todos-vue-fb79a.appspot.com",
    messagingSenderId: "412360629178",
    appId: "1:412360629178:web:11ba6bb56af6b640c1db83",
    measurementId: "G-C5293Y72KS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
//firestore.settings({ timestampsInSnapshots: true });

export default firestore;
