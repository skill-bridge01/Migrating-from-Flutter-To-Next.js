"use client";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import { selectPhone } from "@/store/phone";
import { useDispatch, useSelector } from "react-redux";
import { toastNotification } from "@/components/ToastNTF";

const App = () => {
  const curPhone = useSelector(selectPhone);
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  let code = new Array<string>(6).fill("");

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
          console.log("err333", res);
          setUser(res.user);
          setLoading(false);
          router.push("/employee/webUser");
      })
      .catch((err) => {
        toastNotification(
            "メールアドレスかパスワードが異なります",
            "error",
            3000,
          );
        console.log("err", err);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="bg-white w-full ">
        <div className="pb-20 mt-52 border-8 border-blue-500 rounded-3xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
          <p className="text-5xl font-bold pt-28 pb-16">ユーザ認証</p>
          <div className="bg-slate-700 flex flex-col p-5 border-2 rounded-xl w-[450px]">
            <div className="py-8 flex flex-col justify-center items-center">
              <h1 className="font-medium text-[16px] leading-[130%]  text-white">
                確認コードは次の宛先に送信されました：
              </h1>
              <p className="mt-2 text-base  text-white ">
                +{curPhone.phone}&nbsp;
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
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="gap-3"
              ></OtpInput>
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
                <span className="font-light text-white text-lg">確認</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
