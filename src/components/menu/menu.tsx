import React, { useEffect, useState } from "react";
import Button from "@/components/button/button.tsx";
import { useDispatch } from "react-redux";
import {
  updateConsultation,
  updateConsultationMenu,
  updateSelfCareMenu,
} from "../../store/chat";
import { selectChat } from "@/store/chat";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPhone } from "@/store/phone";
// import DateTimePicker from "react-datetime-picker";
// import Datetime from "react-datetime";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
const style = {
  label: {
    color: "rgba(0, 0, 0, 0.46)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "20px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0",
  },
};

const useStyles = makeStyles(style);

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
// interface Props {
//   handleConsultation: () => void;
// }
const Menu = () => {
  const classes = useStyles();
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  // const [value, setValue] = useState<Value>(new Date());
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));
  console.log("value", value?.$y, value?.$M+1, value?.$D,value?.$H,value?.$m, );
  const [selfCareMenu, setSelfCareMenu] = useState(false);
  const [mannedConsultation, setMannedConsultation] = useState(false);
  const [phone, setPhone] = useState("");
  const dispatch = useAppDispatch();
  const handleConsultationMenu = () => {
    setSelfCareMenu(false);
    setMannedConsultation(false);
    dispatch(updateConsultationMenu(true));
  };
  const handleConsultation = () => {
    setMannedConsultation(false);
    setSelfCareMenu(false);
    dispatch(updateConsultation(true));
  };
  const handleSelfCareMenu = () => {
    setMannedConsultation(false);
    setSelfCareMenu(true);
    dispatch(updateSelfCareMenu(true));
    // goToBottom();
  };
  const handleMannedConsultation = () => {
    setSelfCareMenu(false);
    setMannedConsultation(true);
    // dispatch(updateSelfCareMenu(true));
    // goToBottom();
  };

  // const goToBottom = () => {
  // 	window.scrollTo({
  // 		// top: 0,      //Go to top
  //     top: document.documentElement.scrollHeight,   // Go to bottom
  // 		behavior: 'smooth',
  // 	});
  // };
  // useEffect(() => {
  //   console.log("click1313");
  //   // if (sharedState) {
  //   //   setSharedState(false);
  //   // }
  // }, []);
  // export default function Menu({handleConsultation}) {
  // const handleConsultation=()=>{

  // }
  return (
    <div className="w-full pt-5 pb-3">
      <div className="flex gap-3 justify-center">
        <div className="flex flex-col gap-5 mt-4 items-center">
          <h1 className="text-teal text-7xl tracking-widest">MENU</h1>
          <p className="text-gray-dark text-lg pt-3 flex flex-col">
            <span>以下のメニューから</span>
            <span>お選びください。</span>
          </p>
        </div>
        {/* <Image
            src="/assets/images/bear.png"
            alt="Bear Logo"
            width={100}
            height={80}
            priority
        /> */}
        <img src="/assets/images/bear.png" className="w-20 h-32" />
      </div>
      <div>
        <p className="mt-14 border-l-8 border-gray-dark pl-3 text-3xl">
          チャットサービスメニュー
        </p>
        <p className="mt-6 border-gray-dark pl-5 text-lg">
          AIとのチャットサービスは24時間ご利用可能。
        </p>
        <p className=" border-gray-dark pl-5 text-lg">
          サイト右のチャット相談からお入りください。
        </p>
        <div className="flex gap-6 mt-10 text-center">
          {/* <Button onClick="" title="AIお悩み相談 Menu" /> */}
          <button
            onClick={handleConsultationMenu}
            rel="noopener noreferrer"
            className="px-4 w-56 h-20 flex justify-center items-center border rounded-2xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white text-lg">
              AIお悩み相談 Menu
            </h1>
          </button>
          <button
            onClick={handleConsultation}
            rel="noopener noreferrer"
            className="px-4 w-56 h-20 flex justify-center items-center border rounded-2xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white text-lg">
              AIハラスメント診断
            </h1>
          </button>
        </div>
      </div>
      <div>
        <p className="mt-20 border-l-8 border-gray-dark pl-3 text-3xl">
          セルフサービスメニュー
        </p>
        <p className="mt-6 border-gray-dark pl-5 text-lg">
          ご自身のメンタルヘルスをチェックしたり、解消するお手伝いをいたします。
        </p>
        <p className=" border-gray-dark pl-5 text-lg">
          以下のサービスよりお選びください。
        </p>
        <div className="flex gap-6 mt-10 text-center">
          <button
            onClick={handleSelfCareMenu}
            rel="noopener noreferrer"
            className="px-4 w-56 h-20 flex justify-center items-center border rounded-2xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white text-lg">
              セルフケア MENU
            </h1>
          </button>
          <Button
            link="https://xs805903.xsrv.jp/kirihare001/shinri-test/"
            title="心理テスト"
          />
        </div>
        <div className="flex gap-6 mt-10 text-center">
          <Button
            link="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=harassmentview&webLogin=true&l=XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3"
            title="ハラスメント Web報告"
          />
          <button
            onClick={handleMannedConsultation}
            rel="noopener noreferrer"
            className="px-4 w-56 h-20 flex justify-center items-center border rounded-2xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white text-lg">
              有人ハラスメント 相談窓口
            </h1>
          </button>
        </div>
      </div>
      {selfCareMenu && (
        <div className="pt-10 pl-20 pr-48">
          <p className="pb-4 text-xl">セルフケア MENU</p>
          <a
            target="_blank"
            href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=kokoronikki&webLogin=true&l=XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3"
          >
            <img
              src="https://kirihare.blob.core.windows.net/corporate/webapp/submenu2/a_pc.png"
              className="border-2 border-green p-1 rounded-lg mb-2"
            />
          </a>
          <a href="https://kirihare.net/healthcare/\" target="_blank">
            <img
              src="https://kirihare.blob.core.windows.net/corporate/webapp/submenu2/b_pc.png"
              className="border-2 border-green p-1 rounded-lg mb-2"
            />
          </a>
          <a
            href="https://kirihare.blob.core.windows.net/corporate/jiritukunren/pc/index.html"
            target="_blank"
          >
            <img
              src="https://kirihare.blob.core.windows.net/corporate/webapp/submenu2/c_pc.png"
              className="border-2 border-green p-1 rounded-lg mb-2"
            />
          </a>
          <a
            href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=columnmethod&webLogin=true&l=XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3\"
            target="_blank"
          >
            <img
              src="https://kirihare.blob.core.windows.net/corporate/webapp/submenu2/d_pc.png"
              className="border-2 border-green p-1 rounded-lg "
            />
          </a>
        </div>
      )}
      {mannedConsultation && (
        <div className="pt-10 px-10">
          <p className="pb-4 text-xl ">有人ハラスメント 相談窓口</p>
          <InputLabel className={classes.label}>日時ピッカー</InputLabel>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              // label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
      )}
    </div>
  );
};

export default Menu;
