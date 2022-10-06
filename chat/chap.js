import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, setDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


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
const auth = getAuth();
const db = getFirestore(app);



window.onload = async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("=====> Logged user email Address is : " + user.email + " <=====" + "  " + "=====> Logged user id is : " + uid + "  " + " <=====");
            getDataFromDataBase(user.email, user.uid);
        } else {
        }
    });
}

const loggedInuName = document.getElementById("loggedInuName");

const getDataFromDataBase = async (email, uid) => {
    const q = query(collection(db, "user"), where("mail", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const uname = doc.data().name;
        loggedInuName.innerHTML = uname;
        getAllusers(email, uname, uid)
    });
}

// Get all users except the logged one:



const getAllusers = async (email, name, uid) => {
    const q = query(collection(db, "user"), where("mail", "!=", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const allUsersArea = document.getElementById("allUsersArea");
        // doc.data() is never undefined for query doc snapshots
        allUsersArea.innerHTML += `<li>${doc.data().name}<button onclick='startChat("${doc.data().name}" , "${uid}" , "${doc.id}")'>Start chat</button></li>`
        console.log(doc.id, " => ", doc.data());
        console.log
    });
}


const startChat = (name, loggeduid, id) => {
    const userNameonWindow = document.getElementById("userNameonWindow");
    userNameonWindow.innerHTML = name;
    let chatID;
    let unsubscribe;
    if(unsubscribe){
        unsubscribe()
    }
    if (loggeduid < id) {
        chatID = `${id}${loggeduid}`
    } else {
        chatID = `${loggeduid}${id}`
    }

    const msgArea = document.getElementById("msgArea");

    const sendbutton = document.getElementById("sendbutton")
    sendbutton.addEventListener("click", async () => {
        if (msgArea.value != "") {
            msgcontallmsg.innerHTML = "";
            await setDoc(doc(db, "messages", chatID ,CurrentID, senderID), {
                message: msgArea.value,
                chatID: chatID,
                senderID: senderID,
                CurrentID: CurrentID,
            });

            msgArea.innerHTML = ""
        }
        else {
            swal("Error", "Empty message area", "warning");
        }
    }
    )
    loadAllMessages(chatID);
}

const loadAllMessages = (chatID) => {
    const q = query(collection(db, "messages"), where("chatID", "==", chatID));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const msgcontallmsg = document.getElementById("msgcontallmsg")
            msgcontallmsg.innerHTML += `<li>${doc.data().message}</li>`
        });
        console.log("Current cities in CA: ", cities.join(", "));
    });
}






window.startChat = startChat