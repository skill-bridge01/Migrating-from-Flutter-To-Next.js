import * as styles from "./header.css.ts";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLockOpen,
  faRightFromBracket,
  faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";
import { selectUser, logOut, isRecaptcha } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
type Props = {
  link: string;
  title: string;
  description: string;
};
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/firebase/firebase";

export default function Header() {
  const dispatch = useDispatch();
  const [helpURL, setHelpURL] = useState("");
  const auth = getAuth(app);
  const router = useRouter();
  const handleLogout = () => {
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
  const handleHelp = () => {
    router.push(helpURL);
  };
  const phoneVerify = async () => {
    router.push("/employee/twoPhaseAuth");
    console.log('isRecaptcha')
    dispatch(isRecaptcha(true));
  };

  useEffect(() => {
    // Define an async function
    const fetchHelpUrl = async () => {
      try {
        const response = await axios.get("https://kirihare-web.jp/web/manual");
        setHelpURL(response.data);
        // console.log("helpUrl", response.data);
      } catch (error) {
        // Handle the error accordingly
        console.error("Error fetching the help URL:", error);
      }
    };
    // Immediately call the async function
    fetchHelpUrl();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="bg-teal w-full flex flex-col items-center justify-center pt-5 pb-3">
      <div className="w-full flex md:relative md:justify-center lg:items-end items-center justify-between md:px-0 px-3">
        <h1 className="text-white xl:text-6xl lg:text-5xl sm:text-4xl xs:text-3xl text-[22px]">
          メンタルヘルスケアサービス
        </h1>
        <div className="md:absolute lg:right-10 right-4">
          <div className="lg:flex items-center gap-6 hidden">
            <FontAwesomeIcon
              icon={faLockOpen}
              style={{ height: "40px", color: "white" }}
              className="cursor-pointer"
              // onClick={() => router.push("/mfa")}
              onClick={phoneVerify}
            />
            <a href={helpURL} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "40px", color: "white" }}
                className="cursor-pointer"
                // onClick={() => router.push("/mfa")}
                // onClick={handleHelp}
              />
            </a>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ height: "40px", color: "white" }}
              className="cursor-pointer"
              // onClick={() => router.push("/mfa")}
              onClick={handleLogout}
            />
            {/* <img
              src="/assets/images/login.png"
              className=" drop-shadow-2xl cursor-pointer hover:drop-shadow-3xl h-16"
              onClick={handleLogout}
            /> */}
          </div>
          <div className="lg:hidden xs:flex hidden items-center gap-3">
            <FontAwesomeIcon
              icon={faLockOpen}
              style={{ height: "28px", color: "white" }}
              className="cursor-pointer"
              onClick={phoneVerify}
            />
            <a href={helpURL} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "28px", color: "white" }}
                className="cursor-pointer"
                // onClick={() => router.push("/mfa")}
                // onClick={handleHelp}
              />
            </a>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ height: "28px", color: "white" }}
              className="cursor-pointer"
              onClick={handleLogout}
            />
            
          </div>
          <div className="xs:hidden flex items-center gap-2">
            <FontAwesomeIcon
              icon={faLockOpen}
              style={{ height: "22px", color: "white" }}
              className="cursor-pointer"
              onClick={phoneVerify}
            />
            <a href={helpURL} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "22px", color: "white" }}
                className="cursor-pointer"
                // onClick={() => router.push("/mfa")}
                // onClick={handleHelp}
              />
            </a>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ height: "22px", color: "white" }}
              className="cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
      

      <div className="w-full md:flex relative justify-center hidden">
        <p className="text-black xl:text-xl lg:text-lg text-base pt-3">
          <span className="xl:text-3xl lg:text-2xl text-xl">Al</span>が
          <span className="xl:text-3xl lg:text-2xl text-xl">24</span>
          時間あなたのご相談にのります。　人に言いにくいことでも、まずは話してみてください。
        </p>
        
      </div>
      <div className="md:flex hidden transform skew-x-40 h-2 xl:w-180 lg:w-160 w-140 bg-yellow"></div>
    </div>
  );
}
