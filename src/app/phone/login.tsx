'use client'
import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { app } from "@/firebase/firebase";
import { useRouter } from "next/navigation"; // Correct import for useRouter in Next.js

interface Window {
  recaptchaVerifier?: app.auth.RecaptchaVerifier;
}

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response: any) => {
          // reCAPTCHA solved - allow signInWithPhoneNumber
        },
        'expired-callback': () => {
          // Handle expired reCAPTCHA if needed
        }
      }, auth);
      window.recaptchaVerifier.render().catch((error: any) => {
        console.error("Recaptcha render error:", error);
      });
    }
  }, [auth]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber('');
      alert('OTP has been sent');
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        // OTP has been successfully verified
        // You can now do something, e.g., navigate to another page or display a success message
        // router.push('/dashboard'); // Example navigation after successful login
        alert('Logged in successfully!');
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      {!otpSent && <div id="recaptcha-container"></div>}
      <input
        type="tel"
        value={otpSent ? otp : phoneNumber}
        onChange={otpSent ? handleOTPChange : handlePhoneNumberChange}
        placeholder={otpSent ? "Enter OTP" : "Enter phone number"}
        className="border border-gray-500 p-2 rounded-md"
      />
      <button
        onClick={otpSent ? handleOTPSubmit : handleSendOtp}
        className={`p-2 rounded text-white ${otpSent ? 'bg-green-500' : 'bg-blue-500'}`}
      >
        {otpSent ? 'Submit OTP' : 'Send OTP'}
      </button>
    </div>
  );
};

export default Login;