import { kMaxLength } from "buffer";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaPhone } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toastNotification } from "../../components/ToastNTF";
import { useDispatch } from "react-redux";
import { updatePhone } from "../../store/phone";
// import "react-phone-number-input/style.css";
// import PhoneInput  from "react-phone-number-input";

type Props = {
  getPhoneNumber: (phoneNumber: string) => void;
};

const PhoneRegistration = ({ getPhoneNumber }: Props) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const phoneNumber = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("currentPhone", phoneNumber.current?.value);
    e.preventDefault();
    // if (phoneNumber.current) {
    //   getPhoneNumber(phoneNumber.current.value);
    // }
    if (phone.length < 11) {
      console.log("less");
      toastNotification(
        "またはあなたの電話番号を入力してください",
        "error",
        3000,
      );
      return;
    }
    if (phone) {
      dispatch(updatePhone(phone));
      console.log("currentPhone", "+" + phone, phoneNumber.current?.value);
      getPhoneNumber("+" + phone);
    }
  };

  return (
    <div className="bg-white w-full ">
      <div className="pb-20 mt-52 border-8 border-blue-500 rounded-3xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
        <p className="text-5xl font-bold pt-36 pb-16">ツーファクタ認証</p>
        <div className="flex flex-col justify-evenly items-center space-y-4 w-96 h-1/3 bg-slate-600 rounded-xl">
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-medium text-white pt-10 pb-8">
              電話番号を設定
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-12 w-full pb-10"
          >
            <div className="relative px-10">
              <p className="text-md text-white pb-2">電話番号:</p>
              {/* <input
              ref={phoneNumber}
              type="text"
              placeholder="Insert your phone number"
              className="w-full h-10 pl-7 pr-4 border-2 border-slate-300 rounded-md focus:outline-none"
            />
            <FaPhone className="absolute top-3 left-10 text-black" /> */}
              <PhoneInput country={"jp"} value={phone} onChange={setPhone} />
            </div>
            <div className="flex space-x-4 px-8">
              <button
                onClick={() => void router.push("/signin")}
                type="button"
                className="w-full h-10 bg-[#50A05C] text-lg text-white rounded-xl hover:bg-[#33723c]"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="w-full h-10 bg-[#50A05C] text-lg text-white rounded-xl hover:bg-[#33723c]"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneRegistration;
