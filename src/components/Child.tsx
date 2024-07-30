"use client";

import "react-toastify/dist/ReactToastify.css";
import { selectUser } from "@/store/user";
import { useDispatch, useSelector } from "react-redux";

export const Child = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const isRecaptcha1 = useSelector(selectUser);
  console.log("isRecaptcha1", isRecaptcha1.user.recaptcha);
  return (
    <>
      {children}
      {isRecaptcha1.user.recaptcha ? (
        <div id="recaptcha-container"></div>
      ) : (
        <div id="recaptcha-container" style={{ display: "none" }}></div>
      )}
    </>
  );
};

