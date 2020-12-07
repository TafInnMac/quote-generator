import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

export class Firebase {
    // Firebase configuration
    static firebaseConfig = {
        apiKey: "AIzaSyDqwNzmqUfeBdir5PfPIvMorAYNu40Jc8E",
        authDomain: "quotes-board-f94ec.firebaseapp.com",
        databaseURL: "https://quotes-board-f94ec.firebaseio.com",
        projectId: "quotes-board-f94ec",
        storageBucket: "quotes-board-f94ec.appspot.com",
        messagingSenderId: "477457420485",
        appId: "1:477457420485:web:7980e8957759949c3ba0ac",
        measurementId: "G-2T0X00LSBK",
    };
    
    // Initialize Firebase
    static firebaseApp = firebase.initializeApp(Firebase.firebaseConfig);
    // firebase.analytics();
    static database = firebase.database();
    static ref = Firebase.database.ref("quotes");
}
