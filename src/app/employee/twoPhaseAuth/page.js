"use client";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "@/firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth,
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        router.push("/employee/checkTwoPhaseCode");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <div className="bg-white w-full ">
      <div className="pb-20 mt-52 border-8 border-blue-500 rounded-3xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
        <p className="text-5xl font-bold pt-36 pb-16">ツーファクタ認証</p>
        <div className="flex flex-col justify-evenly items-center space-y-4 w-96 h-1/3 bg-slate-600 rounded-xl">
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-medium text-white pt-10 pb-8">
              電話番号を設定
            </h1>
          </div>
          <div className="flex flex-col space-y-12 w-full pb-10">
            <div className="relative px-10">
              <p className="text-md text-white pb-2">電話番号:</p>
              {/* <input
              ref={phoneNumber}
              type="text"
              placeholder="Insert your phone number"
              className="w-full h-10 pl-7 pr-4 border-2 border-slate-300 rounded-md focus:outline-none"
            />
            <FaPhone className="absolute top-3 left-10 text-black" /> */}
              <PhoneInput country={"jp"} value={ph} onChange={setPh} />
            </div>
            <div className="flex space-x-4 px-8">
              <button
                onClick={() => void router.push("/signin")}
                type="button"
                className="w-full h-10 bg-[#50A05C] text-lg text-white rounded-xl hover:bg-[#33723c]"
              >
                キャンセル
              </button>
              <button
                onClick={onSignup}
                className="bg-[#50A05C] w-full flex gap-1 items-center justify-center text-lg text-white rounded-xl hover:bg-[#33723c]"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>保存</span>
              </button>
              <div id="recaptcha-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
