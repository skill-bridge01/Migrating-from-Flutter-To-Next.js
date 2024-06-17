"use client";

import { useRecaptcha } from "@/hooks/useRecaptcha";
import { User } from "firebase/auth";
import PhoneRegistration from "../phoneRegistration";
import { useState } from "react";
import { notify } from "@/utils/notify";
import { verifyPhoneNumber } from "@/firebase/authentication";
import CodeSignup from "../codeSignup";

type Props = {
  currentUser: User | null;
};

const CreateMultiFactorAuthentication = ({ currentUser }: Props) => {
  const recaptcha = useRecaptcha("sign-up");
  const [verificationCodeId, setVerificationCodeId] = useState<string | null>(
    null,
  );

  const getPhoneNumber = async (phoneNumber: string) => {
    if (!currentUser || !recaptcha) {
      return;
    }
    const verificationId = await verifyPhoneNumber(
      currentUser,
      phoneNumber,
      recaptcha,
      );
    if (!verificationId) {
      notify("Something went wrong.");
    } else {
      setVerificationCodeId(verificationId);
    }
  };

  return (
    <div>
      {!verificationCodeId && (
        <PhoneRegistration getPhoneNumber={getPhoneNumber} />
      )}
      {verificationCodeId && (
        <CodeSignup
          currentUser={currentUser}
          verificationCodeId={verificationCodeId}
        />
      )}
      <div id="sign-up"></div>
    </div>
  );
};

export default CreateMultiFactorAuthentication;

// // "use client";

// // import { useRecaptcha } from "@/hooks/useRecaptcha";
// // import { User } from "firebase/auth";
// // import PhoneRegistration from "../phoneRegistration";
// // import { useState } from "react";
// // import { notify } from "@/utils/notify";
// // import { verifyPhoneNumber } from "@/firebase/authentication";
// // import CodeSignup from "../codeSignup";

// // type Props = {
// //   currentUser: User | null;
// // };

// // const CreateMultiFactorAuthentication = ({ currentUser }: Props) => {
// //   const recaptcha = useRecaptcha("sign-up");
// //   const [verificationCodeId, setVerificationCodeId] = useState<string | null>(
// //     null,
// //   );
// //   console.log("currentUser", currentUser);

// //   const getPhoneNumber = async (phoneNumber: string) => {
// //     if (!currentUser || !recaptcha) {
// //       return;
// //     }
// //     console.log("currentUser", currentUser);
// //     const verificationId = await verifyPhoneNumber(
// //       currentUser,
// //       phoneNumber,
// //       recaptcha,
// //     );
// //     if (!verificationId) {
// //       notify("Something went wrong.");
// //     } else {
// //       setVerificationCodeId(verificationId);
// //     }
// //   };

// //   return (
// //     <div>
// //       {!verificationCodeId && (
// //         <PhoneRegistration getPhoneNumber={getPhoneNumber} />
// //       )}
// //       {verificationCodeId && (
// //         <CodeSignup
// //           currentUser={currentUser}
// //           verificationCodeId={verificationCodeId}
// //         />
// //       )}
// //       <div id="sign-up"></div>
// //     </div>
// //   );
// // };

// // export default CreateMultiFactorAuthentication;

// "use client";

// import { useRecaptcha } from "@/hooks/useRecaptcha";
// import { login } from "@/firebase/authentication";
// import { User } from "firebase/auth";
// import PhoneRegistration from "../phoneRegistration";
// import { useEffect, useState } from "react";
// import { notify } from "@/utils/notify";
// import { verifyPhoneNumber } from "@/firebase/authentication";
// import CodeSignup from "../codeSignup";
// import { toastNotification } from "@/components/ToastNTF";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// type Props = {
//   currentUser: User | null;
// };

// const CreateMultiFactorAuthentication = ({ currentUser }: Props) => {
//   // const auth = getAuth();
//   // const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
//   //   'size': 'invisible',
//   //   'callback': () => {
//   //     // reCAPTCHA solved, allow signInWithPhoneNumber.
//   //     onSignInSubmit();
//   //   }
//   // });

//   const recaptcha = useRecaptcha("sign-up");
//   const [verificationCodeId, setVerificationCodeId] = useState<string | null>(
//     null,
//   );
//   const getPhoneNumber = async (phoneNumber: string) => {
//     console.log("k1", phoneNumber, verificationCodeId);

//     if (!currentUser || !recaptcha) {
//       return;
//     }
//     const verificationId = await verifyPhoneNumber(
//       currentUser,
//       phoneNumber,
//       recaptcha,
//     );
//     if (!verificationId) {
//       console.log("Error", currentUser);
//       toastNotification("何か問題が発生しました。", "error", 3000);
//     } else {
//       setVerificationCodeId(verificationId);
//     }
//   };
//       // useEffect(() => {
//     //   // Define the async function within the useEffect
//     //   async function performLogin() {
//     //     await login("text@gmail.com", "123456789");
//     //   }
  
//     //   // Call the async function
//     //   performLogin();
//     // }, []);
 

//   return (
//     <div>
//       {!verificationCodeId && (
//         <PhoneRegistration getPhoneNumber={getPhoneNumber} />
//       )}
//       {verificationCodeId && (
//         <CodeSignup
//           currentUser={currentUser}
//           verificationCodeId={verificationCodeId}
//           setVerificationCodeId={setVerificationCodeId}
//         />
//       )}
//       <div id="sign-up"></div>
//     </div>
//   );
// };

// export default CreateMultiFactorAuthentication;
