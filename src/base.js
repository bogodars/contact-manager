import firebase from 'firebase';
import 'firebase/storage';

export const app = firebase.initializeApp({
  projectId: 'manager-str',
  appId: '1:425099471596:web:a9e3e19bc2a94ea554d3c9',
  databaseURL: 'https://manager-str-default-rtdb.firebaseio.com',
  storageBucket: 'manager-str.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyBseQ_9ZnPCMFaLKi3S-Qpbrfpr-R4Oido',
  authDomain: 'manager-str.firebaseapp.com',
  messagingSenderId: '425099471596',
  measurementId: 'G-EL0NGVDXTE',
});

export default firebase;
