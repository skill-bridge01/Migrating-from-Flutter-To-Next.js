// "use client";
// import React, { useState } from "react";
// import firebase from "@/firebase/firebase1"; // Ensure correct path to your firebase initialization
// import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

// // Assuming the types are correctly referenced from firebase imports
// // If not, you may have to import specific types depending on your firebase version

// // const PhoneAuth: React.FC = () => {
// const PhoneAuth = () => {
//     const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [otpSent, setOtpSent] = useState(false);
//   const auth = getAuth(firebase);
//   const [verificationCode, setVerificationCode] = useState("");
//   const [verificationId, setVerificationId] = useState();

//   const handleSendCode1 = () => {
//     // const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//     //   "send-code-button",
//     //   {
//     //     size: "invisible", // Size can be 'invisible' or 'compact' etc based on your use case
//     //   },
//     // );
//     //     const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-up', {
//     //   'size': 'invisible',
//     //   'callback': () => {
//     //     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     //     onSignInSubmit();
//     //   }
//     // });

//     const recaptchaVerifier = new RecaptchaVerifier(auth, "sign-up", {
//       size: "invisible",
//       callback: () => {},
//     });
//     console.log("step1");

//     firebase
//       // .auth()
//       .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
//       .then((verificationIdResponse) => {
//         const verificationId = verificationIdResponse.verificationId; // Correctly extracting the verificationId from verificationIdResponse
//         setVerificationId(verificationId);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//  const handleSendCode = async()=>{
//   const recaptchaVerifier = new RecaptchaVerifier(auth, "sign-up", {
//     size: "invisible",
//     callback: () => {},
//   });
//     try{
//         const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
//         const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
//         setConfirmationResult(confirmation);
//         setOtpSent(true);
//         setPhoneNumber('');
//         alert('OTP has been sent!!!!!');

//     } catch (error){
//       alert('ERR');
//         console.error(error)
//     }
//   };
//     const handleOTPChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleVerifyCode = () => {
//     const credential = firebase.auth.PhoneAuthProvider.credential(
//       verificationId,
//       verificationCode,
//     );

//     firebase
//       .auth()
//       .signInWithCredential(credential)
//       .then((userCredential) => {
//         // User signed in successfully
//         // You may wish to redirect the user or update UI accordingly here
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     // <>
//     //   <input
//     //     type="tel"
//     //     value={phoneNumber}
//     //     onChange={(e) => setPhoneNumber(e.target.value)}
//     //   />
//     //   <button id="send-code-button" onClick={handleSendCode}>
//     //     Send Code
//     //   </button>
//     //   <input
//     //     type="text"
//     //     value={verificationCode}
//     //     onChange={(e) => setVerificationCode(e.target.value)}
//     //   />
//     //   <button onClick={handleVerifyCode}>Verify Code</button>
//     //   <div id="sign-up"></div>
//     // </>
//         <div>
//         {!otpSent ? (
//             <div id="sign-up"></div>

//         ):null}
//         <input
//         type="tel"
//         value={phoneNumber}
//         onChange={handleOTPChange}
//         placeholder="Enter OTP"
//         className="border border-gray-500 p-2 rounded-md"
//         />
//         <button onClick={otpSent? handleOTPSubmit :handleSendCode}
//             className={`bg-${otpSent ? 'green':'blue'}-500 text-white p-2 rounded`}
//             style={{backgroundColor:otpSent? 'green':'blue'}}
//         > {otpSent? 'Submit OTP':'Send OTP'}</button>
//     </div>
//   );
// };

// export default PhoneAuth;

"use client";
// import React, { useState } from 'react';
// import firebase from '@/firebase/firebase';
import React, { useState } from "react";
import firebase from "@/firebase/firebase1"; // Ensure correct path to your firebase initialization
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCredential,
  PhoneAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const PhoneAuth = () => {
  const router = useRouter();
  const auth = getAuth(firebase);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");

  // const handleSendCode = () => {
  //   const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-button', {
  //     size: 'invisible',
  //   });

  //   firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
  //     .then((verificationId) => {
  //       setVerificationId(verificationId);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const handleSendCode = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, "sign-up", {
      size: "invisible",
      callback: () => {},
    });
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      // const confirmation = await signInWithPhoneNumber(
      //   auth,
      //   formattedPhoneNumber,
      //   recaptchaVerifier,
      // );

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        recaptchaVerifier,
      )
        .then((verificationId) => {
          return setVerificationId(verificationId);
        })
        .catch((error) => {
          console.error(error);
        });

      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent!!!!!");
      // recaptchaVerifier.render()
    } catch (error) {
      alert("ERR");
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    console.log("verificationId", verificationId);
    console.log("verificationCode", verificationCode);

    // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);

    // firebase.auth().signInWithCredential(credential)
    //   .then((userCredential) => {
    //     // User signed in successfully
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const phoneCredential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode,
    );
    const userCredential = await signInWithCredential(auth, phoneCredential)
      .then((userCredential) => {
        // User is signed in
        console.log("User signed in successfully!");
      })
      .catch((error) => {
        // Handle Errors here
        console.log("errrrrr");
        console.error(error);
      });
    // const phoneAuthProvider = new PhoneAuthProvider(auth);
    // try {
    //   return await phoneAuthProvider.verifyPhoneNumber(
    //     verificationId,
    //     verificationCode,
    //   );
    // } catch (e) {
    //   console.log("ERRRRRR", e);
    //   return false;
    // }

    // try {
    //   // Create credential from the verification ID and verification code
    //   const credential = PhoneAuthProvider.credential(
    //     verificationId,
    //     verificationCode,
    //   );
    //   console.log("verificationId", verificationId);
    //   console.log("verificationCode", verificationCode);

    //   // Attempt to sign in with the credential
    //   const userCredential = await signInWithCredential(auth, credential);

    //   console.log("SUCCESS", userCredential);
    //   router.push("/home"); // Navigate to /home on success
    // } catch (error) {
    //   console.log("ERRRRRR", error);
    // }

    // const credential = await PhoneAuthProvider.credential(
    //   verificationId,
    //   verificationCode,
    // );

    // signInWithCredential(credential)
    // .then((userCredential) => {
    //   console.log('SUCCESS')
    //   router.push('/home')
    // })
    // .catch((error) => {
    //   console.log('ERRRRRR')
    //   console.error(error);
    // });

    // firebase
    //   .auth()
    //   .signInWithCredential(credential)
    //   .then((userCredential) => {
    //     // User signed in successfully
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button id="send-code-button" onClick={handleSendCode}>
        Send Code
      </button>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerifyCode}>Verify Code</button>
      {/* <div id="sign-up"></div> */}
      {!otpSent ? <div id="sign-up"></div> : null}
    </>
  );
};

export default PhoneAuth;
