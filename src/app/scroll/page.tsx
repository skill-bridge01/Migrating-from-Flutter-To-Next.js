"use client";
import { useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import ScrollToTop from "@/components/ScrollToTop";
import './index.css'


const SomeComponent = () => {
  const socket = useWebSocket("wss://kirihare-api.jp/io/");

  return (
    <div>
      ef
      {/* <div className="section section1"></div>
      <div className="section section2"></div>
      <div className="section section3"></div> */}
      <div className="section section4"></div>
      <div className="section section5"></div>
      <ScrollToTop />

    </div>
  );
};

export default SomeComponent;
