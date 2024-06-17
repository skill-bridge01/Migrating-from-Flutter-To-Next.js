"use client";

import { SignIn } from "@/components/signin";
import { login } from "@/firebase/authentication";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { notify } from "@/utils/notify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MultiFactorResolver } from "firebase/auth";
import { toastNotification } from "../../components/ToastNTF";
import { verifyUserMFA } from "@/firebase/authentication";
import CodeSignIn from "@/components/codeSignin";

const Login = () => {
  const router = useRouter();
  const recaptcha = useRecaptcha("sign-in");
  const [verificationId, setVerificationId] = useState<string>();
  const [resolver, setResolver] = useState<MultiFactorResolver>();

  async function loginWithEmailAndPassword(email: string, password: string) {
    const response = await login(email, password);

    if (response === true) {
      console.log("success11");
      router.push("/mfa");
      // return 1;
    } else {
      // await handleMFA(response);
      console.log("err");
      // return 0;
    }
  }

  const handleMFA = async (response: any) => {
    if (response.code === "auth/multi-factor-auth-required" && recaptcha) {
      const data = await verifyUserMFA(response, recaptcha, 0);
      console.log(response, recaptcha);

      if (!data) {
      } else {
        toastNotification("電話番号認証", "success", 3000);
        const { verificationId, resolver } = data;
        setVerificationId(verificationId);
        setResolver(resolver);
      }
    } else {
      // toastNotification(
      //   "メールアドレスかパスワードが異なります",
      //   "error",
      //   3000,
      // );
      console.log("~~~~~~~~", verificationId, resolver);
    }
  };

  return (
    <div>
      {/* {!verificationId && !resolver && (
        <SignIn loginWithEmailAndPassword={loginWithEmailAndPassword} />
      )}
      {verificationId && resolver && (
        <CodeSignIn verificationId={verificationId} resolver={resolver} />
      )} */}
      <SignIn loginWithEmailAndPassword={loginWithEmailAndPassword} />
      <div id="sign-in"></div>
    </div>
  );
};

export default Login;
