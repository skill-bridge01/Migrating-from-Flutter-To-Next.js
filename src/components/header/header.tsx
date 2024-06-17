import Logout from "../Logout.tsx";
import { login } from "@/firebase/authentication";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./header.css.ts";
import { useAuthContext } from "@/context/AuthContext";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { selectPhone } from "../../store/phone";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const auth = getAuth(firebase_app);

type Props = {
  link: string;
  title: string;
  description: string;
};

interface User {
  // Define the structure of your User object here. For example:
  id: number;
  name: string;
  // Add other user properties as needed
}

export default function Header() {
  const { user } = useAuthContext() as { user: User | null };
  console.log("user1", user);
  const [email, setEmail] = useState<string>("sayaka.fukuda+2000demo_@kirihare.jp");
  const [password, setPassword] = useState<string>("krhr1234");
  // const[email, setEmail]=useState('test@gmail.com')
  // const[password, setPassword]=useState('test1234')
  async function loginWithEmailAndPassword(email: string, password: string) {
    const response = await login(email, password);

    if (response === true) {
      console.log("fakeEmail and pwd success");
      // router.push("/chatpage1");
      // return 1;
    } else {
      // await handleMFA(response);
      console.log("fakeEmail and pwd error");
      // return 0;
    }
  }
  const dispatch = useDispatch();
  const verifyPhone = useSelector(selectPhone);
  console.log("verifyPhone", verifyPhone.phone.verify);
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
  const phoneVerify = async () => {
    loginWithEmailAndPassword(email, password);
    // await login("text@gmail.com", "test1234");
    router.push("/mfa");
  };
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
            {!user && (
              <FontAwesomeIcon
                icon={faLockOpen}
                style={{ height: "40px", color: "white" }}
                className="cursor-pointer"
                // onClick={() => router.push("/mfa")}
                onClick={phoneVerify}
              />
            )}

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
