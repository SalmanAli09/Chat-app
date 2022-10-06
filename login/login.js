import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// import { doc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyClroLGfyZGHn2zEzL7WI84nQNuqY21o1E",
    authDomain: "chatapp-2ea5c.firebaseapp.com",
    projectId: "chatapp-2ea5c",
    storageBucket: "chatapp-2ea5c.appspot.com",
    messagingSenderId: "209419247423",
    appId: "1:209419247423:web:b5ab4ad06a2b6f2e60bd8a",
    measurementId: "G-ZWKSK5JSPJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


// login users 

const lmail = document.getElementById("lmail")
const lpass = document.getElementById("lpass")

const loginbtn = document.getElementById("loginbtn");

loginbtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, lmail.value, lpass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            window.location.href = "../chat/chat.html"

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, "no user found")
        });

}
)
