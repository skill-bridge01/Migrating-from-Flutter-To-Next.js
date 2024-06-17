"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { logout } from "@/firebase/authentication";
import firebase_app from "@/firebase/config";
const auth = getAuth(firebase_app);

interface User {
  // Define the structure of your User object here. For example:
  id: number;
  name: string;
  // Add other user properties as needed
}

function Logout(): JSX.Element {
  // `JSX.Element` is the type for the return of a component
  // Adjust the expected structure based on your context definition
  const { user } = useAuthContext() as { user: User | null };
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
    // logout()
      .then(() => {
        // Sign-out successful.
        router.push("/chat");
        console.log("Signed out successfully111");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // React.useEffect(() => {
  //   if (user == null) {
  //     router.push("/");
  //   }
  // }, [user]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <>
      <button
        onClick={handleLogout}
        className="text-2xl font-bold bg-brown rounded-lg px-4 py-3 text-white"
      >
        ログアウト
      </button>
    </>
  );
}

export default Logout;
