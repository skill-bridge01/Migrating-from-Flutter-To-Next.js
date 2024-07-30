"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import { selectPhone, phoneReg } from "@/store/phone";
import {isRecaptcha } from "@/store/user";
import { toastNotification } from "@/components/ToastNTF";
import OTPInput from "./OTPInput";
import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  signOut,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import {
  selectUser,
  logOut,
  updateUserID,
  updateTwoPhaseAuth,
} from "@/store/user";
import { db } from "@/firebase/firestore/addData";
import { app } from "@/firebase/firebase";

const App = () => {
  const curPhone = useSelector(selectPhone);
  // const phoneReg = useSelector(phoneReg);
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const userIdState = useSelector(selectUser);
  const params = {
    code: userIdState.user.userId,
    phone: curPhone.phone.phone,
  };
  console.log("curPhone", curPhone.phone.phone, curPhone.phone.verificationId);

  async function updateDataToFireStore(date, userId, phone) {
    console.log("success12");
    const usersRef = collection(db, "PhoneNumber");
    const q = query(usersRef, where("userId", "==", userIdState.user.userId));

    console.log("success123");
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        // For each document found, update the phone number
        const userDocRef = doc.ref;
        await updateDoc(userDocRef, { phone: "" });
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    console.log("phoneReg", curPhone.phone.phoneReg);
    console.log("EffectcurPhone", curPhone.phone.phone);
    // reCAPTCHAのスクリプトを動的に読み込む
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = () => {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    loadScriptByURL(
      "recaptcha-key",
      "https://www.google.com/recaptcha/api.js?render=explicit",
      () => {
        console.log("Script loaded!");
      },
    );
  }, []);

  const handleSubmit = (pin) => {
    setOtp(pin);
    console.log("pin", pin);
  };
  function onOTPVerify() {
    if (window === undefined || typeof window === "undefin  ed") {
      return;
    }

    if (typeof window !== "undefined") {
      setLoading(true);
      console.log("OTP", otp);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          // const verifyCode = async () => {
          //   try {
          //     const credential = PhoneAuthProvider.credential(
          //       curPhone.phone.verificationId,
          //       otp,
          //     );
          //     // const credential = firebase.auth.PhoneAuthProvider.credential(curPhone.phone.verificationId, otp);
          //     // await firebase.auth().signInWithCredential(credential);
          //     signInWithCredential(auth, credential).then(async (result) => {
          //       console.log("Sign In Success", result);
          //       console.log("params", params);

          //     });
          //   } catch (error) {
          //     // alert('電話のクレデンシャルの生成に使用されたSMS確認コードが無効です。');
          //   }
          // };
          // verifyCode();
          const response = await axios.post(
            "https://kirihare-web.jp/employee/twoPhaseAuth",
            params,
          );
          console.log("Phone_response:", response.data.success);
          if (response.data.success == true) {
            // toastNotification("電話認証成功！", "success", 3000);
            router.push("/chatpage");
            dispatch(phoneReg(false));
            dispatch(isRecaptcha(false));
          }
          console.log("err333", res);
          setUser(res.user);
          dispatch(updateTwoPhaseAuth(false));
          setLoading(false);
          // router.push("/chatpage");
        })
        .catch((err) => {
          setLoading(false);
          toastNotification("2段階認証コードが間違っています", "error", 3000);
          console.log("err", err);
        });
    }
  }

  const changePhone = () => {
    console.log("changePhone");

    updateDataToFireStore();
    onCaptchVerify();
    router.push("/employee/twoPhaseAuth");
  };

  function resendOTP() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = curPhone.phone.phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        toastNotification("新しい確認コードが送信されました", "success", 3000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onCaptchVerify() {
    if (window === undefined || typeof window === "undefined") {
      return;
    }

    if (
      typeof window !== "undefined" &&
      window !== undefined &&
      !window.recaptchaVerifier
    ) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
          },
        },
        auth,
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
      // grecaptcha.reset(window.recaptchaWidgetId);
    }
  }

  const handleLogout = () => {
    console.log("phoneReg", curPhone.phone.phoneReg);
    if (curPhone.phone.phoneReg == true) {
      dispatch(phoneReg(false));
      // dispatch(isRecaptcha(false));
      router.push("/employee/twoPhaseAuth");
    } else {
      signOut(auth)
        .then(() => {
          dispatch(logOut());
          router.push("/signin");
          console.log("Logout successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
    {/* <div id="recaptcha-container"></div> */}
      <div className="w-full">
        <div className="pb-20 mt-32 bg-slate-600 rounded-2xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
          <p className="text-5xl font-bold pt-20 pb-16 text-white">
            ユーザ認証
          </p>
          <div className="bg-slate-700 flex flex-col p-5 border-2 rounded-xl">
            <div className="py-8 flex flex-col justify-center items-center">
              <h1 className="font-medium text-[16px] leading-[130%] text-white">
                確認コードは次の宛先に送信されました：
              </h1>
              <p className="mt-2 text-base  text-white ">
                {curPhone.phone.phone}&nbsp;
                <span
                  className="text-yellow cursor-pointer"
                  onClick={changePhone}
                >
                  {" "}
                  電話番号を変更する
                </span>
              </p>
            </div>
            <p className="text-white">確認コード</p>
            <div className="flex justify-center space-x-4 mt-4 pb-4">
              <OTPInput length={6} onComplete={handleSubmit} />
            </div>
            <div className="flex gap-5 justify-center">
              <button
                onClick={resendOTP}
                className="text-yellow-500 hover:underline"
              >
                新しいコードを送信する
              </button>
            </div>

            <div className="flex mt-4 space-x-4">
              <button
                onClick={handleLogout}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
