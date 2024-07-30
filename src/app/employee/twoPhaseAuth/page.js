"use client";
import { CgSpinner } from "react-icons/cg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { updatePhone, verificationId, phoneReg, selectPhone } from "@/store/phone";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { toastNotification } from "@/components/ToastNTF";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firestore/addData";
import {
  selectUser,
  logOut,
  updateUserID,
  updateTwoPhaseAuth,
} from "@/store/user";
import { useDispatch, useSelector } from "react-redux";

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "PhoneNumber")); // Ensure the collection name is correct.
  const data = []; // This will hold the documents fetched from Firestore.

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, docname: doc, ...doc.data() }); // Spread `doc.data()` to include all fields in the object.
  });

  return data;
}

const App = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [ph, setPh] = useState("");
  const [phStatus, setPhStatus] = useState(false);
  const [verificationId1, setVerificationId] = useState("");
  const [userPhone, setUserPhone] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const userIdState = useSelector(selectUser);
  const curPhone = useSelector(selectPhone);
  async function addPhone(date, userId, phone) {
    try {
      const docRef = await addDoc(collection(db, "PhoneNumber"), {
        id: date,
        userId: userId,
        phone: phone,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async function addDataToFireStore(date, userId, phone) {
    try {
      const userIdExists = userPhone.some((phone) => phone.userId === userId);
      if (userIdExists) {
        // If a user with an empty phone exists, call to update the phone
        await updateDataToFireStore(userId, phone);
      } else {
        // Otherwise, add a new phone number
        await addPhone(date, userId, phone);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async function updateDataToFireStore(userId, phone) {
    const usersRef = collection(db, "PhoneNumber");
    const q = query(usersRef, where("userId", "==", userId));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const userDocRef = doc.ref;
        await updateDoc(userDocRef, { phone: phone });
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    console.log("phoneReg", curPhone.phone.phoneReg);
    dispatch(phoneReg(false));
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
      },
    );
    async function fetchData() {
      const data = await fetchDataFromFirestore(); // Assumed returned type
      await setUserPhone(data);
      await data.map(
        (phone) =>
          phone.userId === userIdState.user.userId &&
          phone.phone !== "" &&
          autoSendTwoPhaseCode(phone.phone),
      );
    }
    fetchData();
  }, []);

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
          callback: (response) => {},
        },
        auth,
      );
    }
  }

  const sendTwoPhaseCode = () => {
    setLoading(true);
    onCaptchVerify();
    
    const formatPh = "+" + ph;
    console.log("formatPh", formatPh);

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        console.log("confirmationResult", confirmationResult);
        setVerificationId(confirmationResult.verificationId);
        const addPhone = async () => {
          if (formatPh) {
            const added = await addDataToFireStore(
              new Date().getTime(),
              userIdState.user.userId,
              ph,
            );
            if (added) {
            }
          }
        };
        addPhone();

        window.confirmationResult = confirmationResult;
        setLoading(false);
        if(phStatus){
          dispatch(updatePhone(ph));
        } else{
          dispatch(updatePhone(formatPh));
        }
        
        dispatch(phoneReg(true));
        const verificationId2 = confirmationResult.verificationId;
        dispatch(verificationId(verificationId2));
        router.push("/employee/checkTwoPhaseCode");
      })
      .catch((error) => {
        toastNotification("電話認証リクエストが多すぎる", "error", 3000);
        console.log(error);
        setLoading(false);
      });
  };

  const autoSendTwoPhaseCode = (phone) => {
    setPhStatus(true);
    setPh(phone);
    // setLoading(true);
    // onCaptchVerify();

    // const appVerifier = window.recaptchaVerifier;

    // const formatPh = "+" + phone;
    // console.log("existPhone", phone);

    // signInWithPhoneNumber(auth, formatPh, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //     setLoading(false);
    //     dispatch(updatePhone(phone));
    //     router.push("/employee/checkTwoPhaseCode");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
  };

  function onSignup() {
    console.log("phoneNu", userPhone);
    userPhone.map(
      (phone) =>
        phone.userId === userIdState.user.userId &&
        phone.phone !== "" &&
        (phone.phone = "123"),
    );
    console.log("length", ph.length);
    if (ph.length < 11) {
      toastNotification("電話番号を入力してください", "error", 3000);
    } else {
      sendTwoPhaseCode();
    }
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        router.push("/signin");
        console.log("Logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" w-full ">
      {/* <div id="recaptcha-container"></div> */}
      <div className="pb-20 mt-32 bg-slate-600 rounded-2xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
        <p
          className="sm:text-5xl text-4xl font-bold pt-28 pb-16"
          style={{ color: "white" }}
        >
          ツーファクタ認証
        </p>
        <div className="bg-slate-700 flex flex-col p-5 border-2 rounded-xl">
          <div className="relative w-full">
            <h1 className="text-2xl flex justify-center font-medium text-white pt-10 pb-8">
              電話番号を設定
            </h1>
            <div className="absolute right-8 top-11">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ height: "24px", color: "white" }}
                className="cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-12 w-full pb-10">
            <div className="relative px-8">
              <p className="text-md text-white pb-2">電話番号:</p>
              <br />
              <p className="text-md text-white pb-2">
                電話番号が「0」から始まる場合は、
                <br />
                最初の「0」を除いて入力します（一部の国・地域を除く）
              </p>
              <br />
              <p className="text-md text-white pb-2">
                例：08011112222 → 8011112222
              </p>
              <PhoneInput
                country={"jp"}
                value={ph}
                onChange={setPh}
                containerStyle={{ width: "95%" }}
                inputStyle={{ width: "100%" }}
              />
            </div>
            <div className="px-8">
              {/* <button
                onClick={() => void router.push("/chatpage")}
                type="button"
                className="w-full h-10 bg-[#50A05C] text-lg text-white rounded-xl hover:bg-[#33723c]"
              >
                キャンセル
              </button> */}
              <button
                onClick={onSignup}
                className="bg-[#50A05C] py-2 w-full flex gap-1 items-center justify-center text-lg text-white rounded-xl hover:bg-[#33723c]"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>保存</span>
              </button>
              {/* <div id="recaptcha-container"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
