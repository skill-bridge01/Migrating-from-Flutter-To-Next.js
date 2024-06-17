import * as styles from "./header.css.ts";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { selectUser } from "../../store/user";
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
  const [helpURL, setHelpURL] = useState("");
  const auth = getAuth(app);
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
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

  useEffect(() => {
    // Define an async function
    const fetchHelpUrl = async () => {
      try {
        const response = await axios.get("https://kirihare-web.jp/web/manual");
        setHelpURL(response.data);
        console.log("helpUrl", response.data);
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
      <h1 className="text-white text-6xl">メンタルヘルスケアサービス</h1>
      <div className="w-full flex relative justify-center">
        <p className="text-black text-xl pt-3">
          <span className="text-3xl">Al</span>が
          <span className="text-3xl">24</span>
          時間あなたのご相談にのります。　人に言いにくいことでも、まずは話してみてください。
        </p>
        <div className="absolute right-10">
          <div className="flex items-center gap-6">
            <a href={helpURL} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ height: "60px", color: "white" }}
                className="cursor-pointer"
                // onClick={() => router.push("/mfa")}
                // onClick={handleHelp}
              />
            </a>

            <img
              src="/assets/images/login.png"
              className=" drop-shadow-2xl cursor-pointer hover:drop-shadow-3xl h-16"
              onClick={handleLogout}
            />
            {/* <Logout /> */}
          </div>
        </div>
      </div>
      <div className="transform skew-x-40 h-2 w-180 bg-yellow"></div>
    </div>
  );
}
