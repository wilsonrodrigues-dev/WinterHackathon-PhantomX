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


//email-password login
loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    await handleUserRedirect(result.user);
  } catch (err) {
    errorText.innerText = err.message;
  }
});

