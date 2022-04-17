import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyBBh7ETt1sqDPwyZ9REvZ15_qElYNMxjGw",

    authDomain: "educatied-7e9ca.firebaseapp.com",

    projectId: "educatied-7e9ca",

    storageBucket: "educatied-7e9ca.appspot.com",

    messagingSenderId: "641761728473",

    appId: "1:641761728473:web:257d82a8bc18008c62abc8",

    measurementId: "G-7HJ77YP7LN"

};


// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });


const auth = getAuth();

export const signInWithGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
