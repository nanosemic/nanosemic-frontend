// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { auth, db, googleProvider } from "../Firebase";

// // ✅ Firebase Email/Password SignUp + Save Email to MongoDB
// export const signUp = async (email, password, extraData = {}) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   const user = userCredential.user;

//   // Save to Firestore
//   await setDoc(doc(db, "users", user.uid), {
//     uid: user.uid,
//     email: user.email,
//     ...extraData,
//   });

//   // Save only email to MongoDB
//  const response= await fetch("http://localhost:3000/api/auth/firebase/saveUser", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ uid: user.uid, email: user.email }),
//   });
//   const data = await response.json();

//   if (response.ok) {
//     const token = data.token;
//     // Save the token to localStorage or a state manager
//     localStorage.setItem('token', token);
//     // Now you can use this token for authenticated API calls
//   } else {
//     console.error(data.message);
//   }
//   return user;
// };

// // ✅ Firebase Google SignIn + Save Email to MongoDB (only if new user)
// export const signInWithGoogle = async () => {
//   const result = await signInWithPopup(auth, googleProvider);
//   const user = result.user;

//   const userRef = doc(db, "users", user.uid);
//   const userSnap = await getDoc(userRef);

//   if (!userSnap.exists()) {
//     // Save to Firestore (only once)
//     const userData = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       provider: "google",
//     };

//     await setDoc(userRef, userData);
//   }

//   // ✅ Always save to MongoDB
//  const response= await fetch("http://localhost:3000/api/auth/firebase/saveUser", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ uid: user.uid, email: user.email }),
//   });
//   const data = await response.json();

//   if (response.ok) {
//     const token = data.token;
//     // Save the token to localStorage or a state manager
//     localStorage.setItem('token', token);
//     // Now you can use this token for authenticated API calls
//   } else {
//     console.error(data.message);
//   }
//   return user;
// };
