import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCPs3qjehM9NovrcFDmD51PvQIYhsw34Tc",
    authDomain: "fragrance-store.firebaseapp.com",
    databaseURL: "https://fragrance-store.firebaseio.com",
    projectId: "fragrance-store",
    storageBucket: "fragrance-store.appspot.com",
    messagingSenderId: "328926068743"
};

const fire = firebase.initializeApp(config);

export default fire;