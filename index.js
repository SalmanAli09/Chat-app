import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { doc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


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
const db = getFirestore(app);


// SignUp new users 

const sname = document.getElementById("sname")
const snum = document.getElementById("snum")
const smail = document.getElementById("smail")
const spass = document.getElementById("spass")


const signupbtn = document.getElementById("signupbtn");

signupbtn.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, smail.value, spass.value)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("verifiication email hasa been sent to you")
        });
      await setDoc(doc(db, "user", user.uid), {
        name: sname.value,
        number: snum.value,
        mail: smail.value,
        pass: spass.value
      });
      localStorage.setItem("username", sname.value)
      localStorage.setItem("email", smail.value)
      localStorage.setItem("password", spass.value)
      window.location.href = "login/login.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });

}
)
