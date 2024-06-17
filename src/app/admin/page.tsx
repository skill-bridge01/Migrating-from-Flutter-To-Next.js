"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";
const auth = getAuth(firebase_app);

interface User {
  id: number;
  name: string;
}

function Page(): JSX.Element {
  const { user } = useAuthContext() as { user: User | null };
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
      });
  };

  React.useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <>
      <h1>Only logged in users can view this page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Page;
