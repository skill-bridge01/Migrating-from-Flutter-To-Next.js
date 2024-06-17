"use client";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLockOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "@/firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updatePhone } from "@/store/phone";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { logOut } from "@/store/user";
import { toastNotification } from "@/components/ToastNTF";

const App = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  // useEffect(() => {
  //   if (window.grecaptcha && window.grecaptcha.render) {
  //     const container = document.getElementById("recaptcha-container");
  //     if (container && container.innerHTML === "") {
  //       window.grecaptcha.render("recaptcha-container", {
  //         sitekey: "6LfbtdYpAAAAAKys5gBVQXVumpZThB9ZmQfZkSCb",
  //         // Other params as needed
  //       });
  //     }
  //   } else {
  //     console.error("grecaptcha is not available");
  //   }
  // }, []);
  useEffect(() => {
    // Function to load the reCAPTCHA script
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }
      if (isScriptExist && callback) callback();
    };

    // Call the function with reCAPTCHA script URL and render your reCAPTCHA after it loads
    loadScriptByURL(
      "recaptcha-key",
      "https://www.google.com/recaptcha/api.js?render=explicit",
      function () {
        console.log("Script loaded!");
        // Render your reCAPTCHA here, ensuring grecaptcha is now available
      },
    );
  }, []);

  function onCaptchVerify() {
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
            // onSignup();
            // grecaptcha.reset("recaptcha-container");
            grecaptcha.render("recaptcha-container");
          },
          "expired-callback": () => {},
        },
        auth,
      );
    }
  }

  function onSignup() {
    console.log("length", ph.length);
    if (ph.length < 12) {
      toastNotification("電話番号を入力してください", "error", 3000);
    }
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        dispatch(updatePhone(ph));
        router.push("/employee/checkTwoPhaseCode");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  const handleLogout = () => {
    // dispatch(logOut());
    //     // Sign-out successful.
    //     router.push("/signin");
    console.log("ddd");
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        // Sign-out successful.
        router.push("/signin");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className=" w-full ">
      <div className="pb-20 mt-32 xs:border-4 border-blue-500 rounded-2xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
        <p className="sm:text-5xl text-4xl font-bold pt-28 pb-16">
          ツーファクタ認証
        </p>
        <div className="flex flex-col justify-evenly items-center space-y-4 w-96 h-1/3 bg-slate-600 rounded-xl">
          <div className="relative w-full">
            <h1 className="text-2xl flex justify-center font-medium text-white pt-10 pb-8">
              電話番号を設定
            </h1>
            <div className="absolute right-8 top-11">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ height: "24px", color: "white" }}
                className="cursor-pointer"
                // onClick={() => router.push("/mfa")}
                onClick={handleLogout}
              />
            </div>
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
                onClick={() => void router.push("/chatpage")}
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
