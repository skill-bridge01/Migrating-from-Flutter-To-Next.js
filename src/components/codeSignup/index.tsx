import { User } from "firebase/auth";
import { Code } from "../code/Code";
import { enrollUser } from "@/firebase/authentication";
import { useRouter } from "next/navigation";
import { notify } from "@/utils/notify";

type Props = {
  currentUser: User | null;
  verificationCodeId: string;
};

const CodeSignup = ({ currentUser, verificationCodeId }: Props) => {
  const router = useRouter();

  const getCode = async (code: string) => {
    if (currentUser) {
      const response = await enrollUser(currentUser, verificationCodeId, code);
      if (response) {
        router.push("/chatpage1");
      } else {
        notify("Something went wrong.");
      }
    }
  };

  return <Code getCode={getCode} />;
};

export default CodeSignup;

// import { useState } from "react";
// import { User } from "firebase/auth";
// import { Code } from "../code/Code";
// import { enrollUser } from "@/firebase/authentication";
// import { useRouter } from "next/navigation";
// import { notify } from "@/utils/notify";
// import { toastNotification } from "@/components/ToastNTF";
// import { useDispatch } from "react-redux";
// import { verifyPhone } from "../../store/phone";

// type Props = {
//   currentUser: User | null;
//   verificationCodeId: string;
//   setVerificationCodeId:any;
// };

// const CodeSignup = ({ currentUser, verificationCodeId,setVerificationCodeId }: Props) => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [phoneVerified, setPhoneVerified]=useState(false)

//   const getCode = async (code: string) => {
//     if (currentUser) {
//       const response = await enrollUser(currentUser, verificationCodeId, code);
//       if (response) {
//         setPhoneVerified(true);
//         dispatch(verifyPhone(phoneVerified));
//         toastNotification("正常に登録されました", "success", 3000);
//         router.push("/chatpage1");
//       } else {
//         toastNotification("メールアドレスを入力してください。", "error", 3000);
//         // notify("Something went wrong.");
//       }
//     }
//   };

//   return <Code getCode={getCode} setVerificationCodeId={setVerificationCodeId}/>;
// };

// // type Props = {
// //   verificationId: string;
// //   resolver: MultiFactorResolver;
// // };

// // const CodeSignIn = ({ verificationId, resolver }: Props) => {
// //   const router = useRouter();

// //   const getCode = async (code: string) => {
// //     const response = await verifyUserEnrolled(
// //       { verificationId, resolver },
// //       code,
// //     );

// //     if (response) {
// //       toastNotification("サインアップおめでとうございます", "success", 3000);
// //       router.push("/chatpage");
// //     } else {
// //       toastNotification(
// //         "エラーが発生しました。しばらくしてからもう一度お試しください",
// //         "error",
// //         3000,
// //       );
// //     }
// //   };

// //   return <CodeSignin getCode={getCode} />;
// // };

// export default CodeSignup;
