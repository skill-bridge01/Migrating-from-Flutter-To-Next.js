"use client";
// import OtpInput from "otp-input-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import { selectPhone } from "@/store/phone";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateTwoPhaseAuth } from "@/store/user";
import { toastNotification } from "@/components/ToastNTF";
import OTPInput from "./OTPInput";
import { CgSpinner } from "react-icons/cg";

const App = () => {
  const curPhone = useSelector(selectPhone);
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  console.log("curPhone", curPhone.phone.phone);
  const handleSubmit = (pin) => {
    setOtp(pin);
    // handle api request here but I'm console logging it
    console.log('pin', pin);
  };
  function onOTPVerify() {
    if (window === undefined || typeof window === "undefin  ed") {
      return;
    }
    
    if (typeof window !== "undefined") {
      setLoading(true);
      console.log('OTP', otp)
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          console.log("err333", res);
          setUser(res.user);
          dispatch(updateTwoPhaseAuth(false));
          setLoading(false);
          router.push("/chatpage");
        })
        .catch((err) => {
          setLoading(false);
          toastNotification(
            "メールアドレスかパスワードが異なります",
            "error",
            3000,
          );
          console.log("err", err);
        });
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="pb-20 mt-32 border-4 border-blue-500 rounded-2xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
          <p className="text-5xl font-bold pt-20 pb-16">ユーザ認証</p>
          <div className="bg-slate-700 flex flex-col p-5 border-2 rounded-xl w-[450px]">
            <div className="py-8 flex flex-col justify-center items-center">
              <h1 className="font-medium text-[16px] leading-[130%]  text-white">
                確認コードは次の宛先に送信されました：
              </h1>
              <p className="mt-2 text-base  text-white ">
                +{curPhone.phone.phone}&nbsp;
                <span
                  className="text-yellow cursor-pointer"
                  onClick={() => void router.push("/employee/twoPhaseAuth")}
                  // onClick={set}
                >
                  {" "}
                  変化する
                </span>
              </p>
            </div>
            <p className="text-white">確認コード</p>
            <div className="flex justify-center space-x-4 mt-4 pb-4">
              <OTPInput length={6} onComplete={handleSubmit} />
            </div>
            <div className="flex gap-5 justify-center">
              <p className="text-white">コードを受信していませんか? </p>
              <p className="text-yellow cursor-pointer">へ送信する</p>
            </div>

            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => router.push("/signin")}
                className="bg-[#50A05C] rounded-xl flex space-x-4 mb-8 text-white text-lg h-11 w-1/2 items-center justify-center px-6 hover:bg-[#33723c]"
              >
                キャンセル
              </button>
              <button
                onClick={onOTPVerify}
                className="bg-[#50A05C] rounded-xl flex h-11 w-1/2 items-center justify-center px-6 text-white mb-8 hover:bg-[#33723c]"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span className="font-light text-white text-lg">確認</span>
              </button>
              {/* <button
                onClick={onSignup}
                className="bg-[#50A05C] w-full flex gap-1 items-center justify-center text-lg text-white rounded-xl hover:bg-[#33723c]"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>保存</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
