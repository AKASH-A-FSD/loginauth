import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
   signInWithEmailAndPassword ,
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGEKZ5mE4q-dP9xIW-96o2dT9qeP-2bPU",
  authDomain: "authfinal-dcf8a.firebaseapp.com",
  projectId: "authfinal-dcf8a",
  storageBucket: "authfinal-dcf8a.firebasestorage.app",
  messagingSenderId: "191537936940",
  appId: "1:191537936940:web:365913529e0c6167046f89",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function signUp() {
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;
  let user = document.getElementById("signup-username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("success");
      window.location.href = "index.html"; 

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);

      // ..
    });
  addDoc(collection(db, "aut"), {
  
    userName: user,
    userEmail: email,
  });
}
function login(){
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "page1.html"; 
    console.log("success");
    localStorage.setItem("email", email);
    sessionStorage.setItem("accessToken", user.accessToken);
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("No such user available. Please signup!!");
  });

}

function logOut() {
  localStorage.removeItem("email");
  sessionStorage.clear();
  console.log("succes");
  
  window.location.href="index.html"
}
module.login=login;
module.logOut = logOut;
module.signUp = signUp;
