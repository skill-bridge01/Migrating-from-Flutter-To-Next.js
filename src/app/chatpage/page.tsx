"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/header/header.tsx";
import Menu from "@/components/menu/menu.tsx";
import Service1 from "@/components/service/service1";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { selectUser } from "@/store/user";
import { useSelector } from "react-redux";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { firebase_app } from "@/firebase/config";

const auth = getAuth(firebase_app);

interface User {
  id: number;
  name: string;
} 

export default function Home() {
  // console.log('$$$$$$$$', messaging)
  const userIdState = useSelector(selectUser);
  // console.log('efsef1111', userIdState)
  const [reduction, setReduction] = useState<boolean | undefined>();
  const { user } = useAuthContext() as { user: User | null };
  const router = useRouter();

  // React.useEffect(() => {

  //   if (router) {
  //     const payloadData = JSON.parse(router);
  //     console.log('Payload Data to save:', payloadData);
  //   }

  // }, [router]);
  // useEffect(() => {
  //   // You only want to attempt to parse and use `data` if it exists.
  //   if (router.query.data) {
  //     try {
  //       // Safely attempt to parse the `data` query parameter.
  //       // const payloadData = JSON.parse(decodeURIComponent(router.query.data));
  //       console.log('Payload Data to save:');

  //       // Now, you can use `payloadData` how you see fit, such as
  //       // sending it to an API, or updating component state with it.

  //     } catch (error) {
  //       console.error('Error parsing data:', error);
  //       // Handle error, such as showing a message to the user or logging.
  //     }
  //   }
  // }, [router.query.data]);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const rawData = router.query.data;

  //     if (rawData) {
  //       try {
  //         const payloadData = JSON.parse(decodeURIComponent(rawData));
  //         console.log('Payload Data to save:', payloadData);
  //       } catch (error) {
  //         console.error('Error parsing data:', error);
  //       }
  //     }
  //   }
  // }, [router.isReady, router.query.data]);

  React.useEffect(() => {
    if (!userIdState.user.userId) {
      router.push("/signin");
    }
  }, [userIdState.user.userId]);

  React.useEffect(() => {
    // console.log('efsef', userIdState.user.userId)
    // window.location.reload();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        // window.location.reload();
      } else {
        // window.location.reload();
        console.log("user is logged out1");
      }
    });
    // startListeningForMessages();
    // console.log('I am firebase Store Background')
  }, []);

  return (
    <main className="w-full  bg-white">
      <Header />
      <div className="">
        {!reduction ? (
          <>
            <div className="xl:p-16 lg:p-6 p-3 grid md:grid-cols-4 lg:gap-8 gap-3">
              <div className="md:col-span-1">
                <Menu />
              </div>
              <div className="md:col-span-3">
                <Service1
                  onScale={() => setReduction(true)}
                  label="AIチャットを全画面表示"
                  // scale="scale-100 hover:scale-110"
                  scale="lg:scale-100 sm:scale-80 scale-50"
                  scale_m="scale-320 hover:scale-330"
                  gap="gap-8"
                  gap1="gap-48"
                  status="min"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="xl:p-16 lg:p-6 p-3 ">
              <Service1
                onScale={() => setReduction(false)}
                label="画面を小さくする"
                scale="xl:scale-120 lg:scale-100 sm:scale-80 scale-50"
                scale_m="scale-320 hover:scale-330"
                gap="gap-20"
                gap1="gap-20"
                status="max"
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
