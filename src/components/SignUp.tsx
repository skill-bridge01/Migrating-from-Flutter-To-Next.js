"use client";
import { At, GoogleLogo, Password } from "phosphor-react";
import { notify } from "@/utils/notify";
import Link from "next/link";
import { signInWithGoole } from "@/firebase/authentication";
import { useRef } from "react";
export function SignUp() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  async function loginWithGoogle() {
    const response = await signInWithGoole();
    if (response !== true) {
      notify("Something went wrong");
    }
  }

  return (
    <>
      <div>Sign Up</div>
      <button onClick={loginWithGoogle}>with Google</button>
      <p className="text-center mb-8">Or</p>
      <form className="space-y-8">
        <input
          ref={email}
          type="email"
          name="email"
          placeholder="Insert your email"
          className="focus:outline-none block w-full rounded-xl placeholder-gray-500 bg-gray-100"
        />
      </form>
      <button onClick={loginWithGoogle}>with Google</button>
    </>
  );
}
