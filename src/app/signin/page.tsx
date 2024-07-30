"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isRecaptcha, updateMenuJson, updatePlanID } from "@/store/user";
import useState from "react-usestateref";
import { toastNotification } from "../../components/ToastNTF";
import ButtonPrimary from "@/components/shared/Button/ButtonPrimary";
import { updatePhone, phoneReg } from "@/store/phone";
import { useMediaQuery } from "react-responsive";
import { selectUser, updateUserID, updateTwoPhaseAuth } from "../../store/user";
import { useAuthContext } from "@/context/AuthContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Loader from "@/components/loader/Loader";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firestore/addData";
interface User {
  id: number;
  name: string;
}
interface PhoneNumberDoc {
  id: string;
  phone: string; // Assuming a structure for demonstration purposes
  userId: string;
}
const LoginPage = () => {
  const userIdState = useSelector(selectUser);
  //   const { connected, publicKey, disconnect } = useWallet();
  const { user } = useAuthContext() as { user: User | null };
  const [invalidForm, setInvalidForm, invalidFormRef] = useState(true);
  const [invalidEmail, setInvalidEmail, invalidEmailRef] = useState(false);
  const [invalidPass, setInvalidPass, invalidPassRef] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });
  const hasNumber = /\d/;
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [userPhone, setUserPhone] = useState<PhoneNumberDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId1, setUsedId] = useState("");
  const auth = getAuth(app);

  const params = {
    mail: email,
    password: password,
    device: "pc1",
    newMenu: true,
  };

  const params1 = useSearchParams();

  const params2 = {
    device: "pc",
    m: params1.get("m"),
    p: params1.get("p"),
  };

  const connectSlackAccount = async () => {
    console.log("Sign M, P", params1.get("m"), params1.get("p"));

    if (params1.get("m") && params1.get("p")) {
      console.log("parms123", params1.get("m"), params1.get("p"));
      const response = await axios.post(
        "https://kirihare-web.jp/slack/applogin",
        params2,
      );

      if (response.data.result !== null) {
        //TODO:response.data.useMedicalSystem
        dispatch(updateUserID(response.data.userId));
        if (response.data.twoPhaseAuth === false) {
          dispatch(updateTwoPhaseAuth(false));
          // toastNotification("ログインしました", "success", 3000);
          return router.push("/chatpage");
          dispatch(isRecaptcha(false));
        } else {
          dispatch(updatePhone(response.data.phone));
          sendTwoPhaseCode(response.data.userId, response.data.phone);
          return router.push("/employee/checkTwoPhaseCode");
        }
      } else {
        router.push("/signin");
        console.log("error1");
      }
    }
  };
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
          callback: () => {},
        },
        auth,
      );
    }
  }

  async function addPhone(date: any, userId: any, phone: any) {
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

  async function addDataToFireStore(date: any, userId: any, phone: any) {
    try {
      const userIdExists = userPhone.some((phone) => phone.userId === userId);
      if (userIdExists) {
        console.log("Update", userId, phone);
        // If a user with an empty phone exists, call to update the phone
        await updateDataToFireStore(userId, phone);
      } else {
        console.log("Add");

        // Otherwise, add a new phone number
        await addPhone(date, userId, phone);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async function updateDataToFireStore(userId: string, phone: string) {
    const usersRef = collection(db, "PhoneNumber");
    const q = query(usersRef, where("userId", "==", userId));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        // For each document found, update the phone number
        const userDocRef = doc.ref;
        await updateDoc(userDocRef, { phone: phone });
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  const sendTwoPhaseCode = (userId: any, ph: any) => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    // console.log("USERID", userId);

    const formatPh = ph;
    if (ph.length > 10) {
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          const addPhone = async () => {
            if (ph) {
              const added = await addDataToFireStore(
                new Date().getTime(),
                userId,
                ph,
              );
              if (added) {
              }
            }
          };
          addPhone();
          (window as any).confirmationResult = confirmationResult;
          setLoading(false);
          dispatch(updatePhone(formatPh));
          router.push("/employee/checkTwoPhaseCode");
        })
        .catch((error) => {
          const errorMessage = "認証コードの送信が一時的に制限されています。\n" +
            "セキュリティ保護のため、1時間あたり5件、1日あたり10件の制限があります。\n" +
            "しばらくしてから再度お試しください。ご不便をおかけして申し訳ありません。";

          toastNotification(errorMessage, "error", 5000);
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      toastNotification("正しい電話番号を入力してください。", "error", 3000);
    }
  };

  async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "PhoneNumber")); // Ensure the collection name is correct.
    // const data= []; // This will hold the documents fetched from Firestore.

    const data: PhoneNumberDoc[] = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        phone: doc.data().phone,
        userId: doc.data().userId,
      }); // Spread `doc.data()` to include all fields in the object.
    });

    return data;
  }

  React.useEffect(() => {
    dispatch(phoneReg(false));
    dispatch(isRecaptcha(true));
    
    connectSlackAccount();
    if (userIdState.user.userId && userIdState.user.twoPhaseAuth === false) {
      router.push("/chatpage");
      dispatch(isRecaptcha(false));
    }
    async function fetchData() {
      const data = await fetchDataFromFirestore(); // Assumed returned type
      setUserPhone(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (email !== "" && email.includes("@")) {
      setInvalidEmail(false);
    }
    if (password.length > 6 && hasNumber.test(password)) {
      setInvalidPass(false);
    }
    if (
      email === "" ||
      !email.includes("@") ||
      password.length < 6 ||
      !hasNumber.test(password)
    ) {
      setInvalidForm(true);
    } else {
      setInvalidForm(false);
    }
  }, [email, password]);

  // function connectAccount() {
  const connectAccount = async () => {
    if (email === "" || !email.includes("@")) {
      setInvalidEmail(true);
      toastNotification("メールアドレスを入力してください。", "error", 3000);
    }
    if (password.length < 6 || !hasNumber.test(password)) {
      toastNotification("パスワードを入力してください。", "error", 3000);
      setInvalidPass(true);
    }
    if (!invalidEmailRef.current && !invalidPassRef.current) {
      const response = await axios.post(
        "https://kirihare-web.jp/employee/webUser",
        params,
      );
      console.log("response111", response);
      if (response.data.result !== null) {
        setUsedId(response.data.userId);
        dispatch(updateUserID(response.data.userId));
        dispatch(updateMenuJson(response.data.menuJson));
        dispatch(updatePlanID(response.data.planId));
        console.log("userID###", response.data.userId);
        console.log("updateMenuJson", response.data.menuJson);
        console.log("twoPhaseAuth", response.data.twoPhaseAuth);
        console.log("planId", response.data.planId);
        if (response.data.twoPhaseAuth === false) {
          dispatch(updateTwoPhaseAuth(false));
          toastNotification("ログインしました", "success", 3000);
          return router.push("/chatpage");
          dispatch(isRecaptcha(false));
        } else {
          console.log("response.data.phone", response.data.phone);
          dispatch(updatePhone(response.data.phone));
          sendTwoPhaseCode(response.data.userId, response.data.phone);
          // return router.push("/employee/checkTwoPhaseCode");
        }
      } else {
        toastNotification(
          "メールアドレスかパスワードが異なります",
          "error",
          3000,
        );
        console.log("error1");
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-100">
          <Loader />
        </div>
      ) : (
        <>
        {/* <div id="recaptcha-container"></div> */}
          <div className=" w-full h-[100vh] flex flex-col justify-center items-center py-[20px]">
            <div
              className={`${
                isDesktop
                  ? "text-[55px]"
                  : "2xl:text-[50px] xl:text-[46px] lg:text-[40px] md:text-[36px] sm:text-[33px] text-[30px]"
              }  text-[#92d692] font-bold font-Inter mt-0`}
            >
              <span
                style={{
                  background: "white",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStrokeColor: "black", // 縁取りの色
                  WebkitTextStrokeWidth: "1px", // 縁取りの太さ
                }}
              >
                KIRIHARE AI & HR
              </span>
            </div>
            <div
              className={`${
                isDesktop
                  ? "w-[600px] h-[500px] mt-[30px] pt-[31px]"
                  : "2xl:w-[500px] xl:w-[510px] lg:w-[430px] md:w-[440px] sm:w-[420px] 2xl:h-[420px] xl:h-[400px] lg:h-[380px] md:h-[380px] sm:h-[360px] w-[90%] h-[340px] 2xl:mt-[20px] lg:mt-[20px] md:mt-[20px] sm:mt-[18px] mt-[16px] 2xl:pt-[10px] xl:pt-[20px] pt-0"
              } relative`}
            >
              <div
                className="absolute w-full h-full left-0 top-0 md:rounded-[40px] sm:rounded-[30px] rounded-[20px] opacity-60 z-0 p-[3px]"
                style={{
                  opacity: "0.8",
                }}
              >
                <div className="w-full h-full bg-[#0f1214] md:rounded-[40px] sm:rounded-[30px] rounded-[20px] z-10"></div>
              </div>
              <div className="w-full h-full flex flex-col justify-center items-center 2xl:px-[57px] xl:px-[40px] md:px-[48px] sm:px-[30px] px-[20px] z-10">
                <div
                  className={`${
                    isDesktop
                      ? "text-[40px]"
                      : "xl:text-[30px] lg:text-[24px] md:text-[23px] sm:text-[22px] text-[21px]"
                  } font-semibold uppercase text-white opacity-100 z-10 2xl:mb-[65px] xl:mb-[20px] lg:mb-[13px] mb-[16px]`}
                >
                  ユーザログイン
                </div>
                <div
                  className={`${
                    isDesktop
                      ? "h-[55px]"
                      : "2xl:h-[50px] xl:h-[50px] lg:h-[45px] sm:h-[46px] h-[45px]"
                  } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
                >
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
                  <input
                    type="text"
                    placeholder="メールアドレス"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    autoComplete="off"
                    className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-textwhite xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
                  />
                  <div className="absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
                    <img
                      src="/assets/images/person.png"
                      className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                    />
                  </div>
                </div>
                <div
                  className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px] mb-6`}
                  style={{
                    visibility: invalidEmailRef.current ? "visible" : "hidden",
                  }}
                >
                  <span className="2xl:text-[14px] md:text-[13px] text-[12px]">
                    (Includes @ value)
                  </span>
                </div>
                <div
                  className={`${
                    isDesktop
                      ? "h-[55px]"
                      : "2xl:h-[50px] xl:h-[50px] lg:h-[48px] sm:h-[46px] h-[45px]"
                  } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
                >
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
                  <input
                    type="password"
                    placeholder="パスワード"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    autoComplete="off"
                    className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-textwhite xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
                  />
                  <div className=" absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
                    <img
                      src="/assets/images/lock.png"
                      className="md:w-[18px] w-[17px] md:h-[20px] h-[17px]"
                    />
                  </div>
                </div>
                <div
                  className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 mb-[5px] text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px]`}
                  style={{
                    visibility: invalidPassRef.current ? "visible" : "hidden",
                  }}
                >
                  <span className="2xl:text-[14px] md:text-[13px] text-[12px]">
                    （6文字以上、かつ数字を1つ以上含めてください）
                  </span>
                </div>
                <ButtonPrimary
                  sizeClass={`${
                    isDesktop
                      ? "mt-[15px] w-[180px] h-[55px]"
                      : "2xl:mt-[10px] lg:mt-[11px] md:mt-[10px] mt-[8px] 2xl:w-[170px] xl:w-[160px] md:w-[150px] w-[140px] 2xl:h-[47px] xl:h-[45px] lg:h-[43px] sm:h-[42px] h-[40px]"
                  }`}
                  fontSize="font-[600] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] text-[12px]"
                  className={`rounded-full`}
                  onClick={connectAccount}
                >
                  ログイン
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </>
      )}
       
    </>
  );
};
export default LoginPage;
