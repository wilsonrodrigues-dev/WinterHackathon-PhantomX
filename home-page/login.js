import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA50b7_sCWGCc91E5V49CDRQGkl1S40ds4",
  authDomain: "sevasaathi-96010.firebaseapp.com",
  projectId: "sevasaathi-96010",
  appId: "1:695605361402:web:7efc728f6c32d16d166743"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const googleBtn = document.getElementById("googleBtn");
const errorText = document.getElementById("error");
const phoneInput = document.getElementById("phone");


async function handleUserRedirect(user) {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  const phone = phoneInput.value.trim();

  //new user
  if (!snap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      name: user.displayName || "User",
      phoneNumber: phone || null,
      smsAlertsEnabled: phone !== "",
      createdAt: serverTimestamp()
    });
  }
  //Existing user
  else {
    if (phone !== "") {
      await setDoc(
        userRef,
        {
          phoneNumber: phone,
          smsAlertsEnabled: true
        },
        { merge: true }
      );
    }
  }}

function showSuccess(msg) {
  document.getElementById("error").innerText = "";
  const success = document.getElementById("success");
  success.innerText = msg;

  // wait 1.2 seconds then go to home hero
  setTimeout(() => {
    window.location.href = "index.html#hero";
  }, 1200);
}

//google login
googleBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    showSuccess("Signed in successfully. Welcome to SevaSaathi!");
    await handleUserRedirect(result.user);
  } catch (err) {
    errorText.innerText = err.message;
  }
});

//email-password login
loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    showSuccess("Signed in successfully. Welcome to SevaSaathi!");
    await handleUserRedirect(result.user);

  } catch (err) {
    errorText.innerText = err.message;
  }
});


//create account with email-password
signupBtn.addEventListener("click", async () => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    document.getElementById("error").innerText = "";
    document.getElementById("success").innerText = "Account created successfully! Welcome to SevaSaathi.";

    await handleUserRedirect(result.user);
  } catch (err) {
    document.getElementById("success").innerText = "";
    errorText.innerText = err.message;
  }
});

