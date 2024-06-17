"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserID, updateTwoPhaseAuth } from "@/store/user";
import axios from "axios";
interface User {
  id: number;
  name: string;
}

export default function Demo() {
  const userIdState = useSelector(selectUser);
  const dispatch = useDispatch();
  // console.log("userIdState", userIdState.user.userId);
  const { user } = useAuthContext() as { user: User | null };
  const router = useRouter();

  const params1 = useSearchParams();

  const params = {
    device:"pc",
    m: params1.get("m"),
    p: params1.get("p"),
  };

  // console.log("parms", params1.get("m"), params1.get("p"));
  const connectAccount = async () => {
    if (params1.get("m") && params1.get("p")) {
      console.log("Slack_URL_Parms", params1.get("m"), params1.get("p"));
      const response = await axios.post(
        "https://kirihare-web.jp/slack/applogin",
        params,
      );
      console.log("response", response);

      

      if (response.data.result !== null) {
        dispatch(updateUserID(response.data.userId));
        if (response.data.twoPhaseAuth == false) {
          dispatch(updateTwoPhaseAuth(false));
          // toastNotification("ログインしました", "success", 3000);
          return router.push("/chatpage");
        } else {
          return router.push("/employee/twoPhaseAuth");
        }
      } else {
        router.push("/signin");
        console.log("error1");
      }

    }
  };

  React.useEffect(() => {
    connectAccount();
  }, []);

  // useEffect(() => {
  //   router.push('/signin');
  // }, [router]);

  React.useEffect(() => {
    console.log("TwoPahseAuth", userIdState.user.twoPhaseAuth);
    if (
      userIdState.user.userId === null ||
      userIdState.user.twoPhaseAuth === true
    ) {
      router.push("/signin");
    } else {
      router.push("/chatpage");
    }
  }, [userIdState.user.userId]);

  return <div>.</div>;
}

// "use client";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/context/AuthContext";
// import { selectUser } from "@/store/user";
// import { useSelector } from "react-redux";
// interface User {
//   id: number;
//   name: string;
// }

// export default function Demo() {
//   const userIdState = useSelector(selectUser);
//   console.log("userIdState", userIdState.user.userId);
//   const { user } = useAuthContext() as { user: User | null };
//   const router = useRouter();
//   // useEffect(() => {
//   //   router.push("/signin");
//   // }, []);
//   // React.useEffect(() => {
//   //   if (user === null || user === undefined) {
//   //     router.push("/signin");
//   //   }
//   //   else{
//   //     router.push("/chatpage");
//   //   }
//   // }, [user]);
//   React.useEffect(() => {
//     console.log ('TwoPahseAUth', userIdState.user.twoPhaseAuth)
//     if (
//       userIdState.user.userId === null ||
//       userIdState.user.twoPhaseAuth === true
//     ) {
//       router.push("/signin");
//     } else {
//       router.push("/chatpage");
//     }
//   }, [userIdState.user.userId]);

//   return <div>.</div>;
// }
