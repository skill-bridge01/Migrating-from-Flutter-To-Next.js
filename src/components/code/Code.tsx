import { useRouter } from "next/navigation";
import Input from "./Input";
import { toastNotification } from "@/components/ToastNTF";
import { selectPhone } from "../../store/phone";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  getCode: (code: string) => void;
  // setVerificationCodeId: any;
};

export function Code({ getCode }: Props) {
  const dispatch = useDispatch();
  const curPhone = useSelector(selectPhone);
  const router = useRouter();
  let code = new Array<string>(6).fill("");
  console.log("curPhone", curPhone.phone);
  // const handleClick = async () => {
  //   try {
  //     console.log("phone1", curPhone.phone);
  //     const finalCode = code.reduce((previousValue, currentValue) => {
  //       return previousValue.concat(currentValue);
  //     });
  //     await getCode(finalCode);
  //   } catch (e) {
  //     toastNotification("メールアドレスを入力してください。", "error", 3000);
  //   }
  // };


  const handleClick = () => {
    const finalCode = code.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue);
    });
    getCode(finalCode);
  };
  // const set: any = () => {
  //   setVerificationCodeId(null);
  // };

  return (
    <div className="bg-white w-full ">
      <div className="pb-20 mt-52 border-8 border-blue-500 rounded-3xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
        <p className="text-5xl font-bold pt-28 pb-16">ユーザ認証</p>
        <div className="bg-slate-700 flex flex-col p-5 border-2 rounded-xl w-[450px]">
          <div className="py-8 flex flex-col justify-center items-center">
            <h1 className="font-medium text-[16px] leading-[130%]  text-white">
              確認コードは次の宛先に送信されました：
            </h1>
            <p className="mt-2 text-base  text-white ">
              +{curPhone.phone}&nbsp;
              <span
                className="text-yellow cursor-pointer"
                // onClick={() => void router.push("/mfa")}
                // onClick={set}
              >
                {" "}
                変化する
              </span>
            </p>
          </div>
          <p className="text-white">確認コード</p>
          <div className="flex justify-center space-x-4 mt-4 pb-4">
            {code.map((value, index) => {
              return (
                <Input
                  key={index}
                  index={index}
                  getValue={(value, index) => {
                    code[index] = value;
                  }}
                />
              );
            })}
          </div>
          <div className="flex gap-5 justify-center">
            <p className="text-white">コードを受信していませんか? </p>
            <p className="text-yellow cursor-pointer">へ送信する</p>
          </div>

          <div className="flex mt-4 space-x-4">
            <button
              onClick={() => router.push("/mfa")}
              className="bg-[#50A05C] rounded-xl flex space-x-4 mb-8 text-white text-lg h-11 w-1/2 items-center justify-center px-6 hover:bg-[#33723c]"
            >
              キャンセル
            </button>
            <button
              onClick={handleClick}
              className="bg-[#50A05C] rounded-xl flex h-11 w-1/2 items-center justify-center px-6 text-white mb-8 hover:bg-[#33723c]"
            >
              <span className="font-light text-white text-lg">確認</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useRouter } from "next/navigation";
// import Input from "./Input";
// import { toastNotification } from "@/components/ToastNTF";
// import { selectPhone } from "../../store/phone";
// import { useDispatch, useSelector } from "react-redux";

// type Props = {
//   getCode: (code: string) => void;
//   setVerificationCodeId: any;
// };

// export function Code({ getCode, setVerificationCodeId }: Props) {
//   const dispatch = useDispatch();
//   const curPhone = useSelector(selectPhone);
//   const router = useRouter();
//   let code = new Array<string>(6).fill("");
//   console.log("curPhone", curPhone.phone);
//   // const handleClick = async () => {
//   //   try {
//   //     console.log("phone1", curPhone.phone);
//   //     const finalCode = code.reduce((previousValue, currentValue) => {
//   //       return previousValue.concat(currentValue);
//   //     });
//   //     await getCode(finalCode);
//   //   } catch (e) {
//   //     toastNotification("メールアドレスを入力してください。", "error", 3000);
//   //   }
//   // };


//   const handleClick = () => {
//     const finalCode = code.reduce((previousValue, currentValue) => {
//       return previousValue.concat(currentValue);
//     });
//     getCode(finalCode);
//   };
//   const set: any = () => {
//     setVerificationCodeId(null);
//   };

//   return (
//     <div className="bg-white w-full ">
//       <div className="pb-20 mt-52 border-8 border-blue-500 rounded-3xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col  items-center w-5/6">
//         <p className="text-5xl font-bold pt-28 pb-16">ユーザ認証</p>
//         <div className="bg-slate-700 flex flex-col p-5 border-2 rounded-xl w-[450px]">
//           <div className="py-8 flex flex-col justify-center items-center">
//             <h1 className="font-medium text-[16px] leading-[130%]  text-white">
//               確認コードは次の宛先に送信されました：
//             </h1>
//             <p className="mt-2 text-base  text-white ">
//               +{curPhone.phone}&nbsp;
//               <span
//                 className="text-yellow cursor-pointer"
//                 // onClick={() => void router.push("/mfa")}
//                 onClick={set}
//               >
//                 {" "}
//                 変化する
//               </span>
//             </p>
//           </div>
//           <p className="text-white">確認コード</p>
//           <div className="flex justify-center space-x-4 mt-4 pb-4">
//             {code.map((value, index) => {
//               return (
//                 <Input
//                   key={index}
//                   index={index}
//                   getValue={(value, index) => {
//                     code[index] = value;
//                   }}
//                 />
//               );
//             })}
//           </div>
//           <div className="flex gap-5 justify-center">
//             <p className="text-white">コードを受信していませんか? </p>
//             <p className="text-yellow cursor-pointer">へ送信する</p>
//           </div>

//           <div className="flex mt-4 space-x-4">
//             <button
//               onClick={() => router.push("/chatpage1")}
//               className="bg-[#50A05C] rounded-xl flex space-x-4 mb-8 text-white text-lg h-11 w-1/2 items-center justify-center px-6 hover:bg-[#33723c]"
//             >
//               キャンセル
//             </button>
//             <button
//               onClick={handleClick}
//               className="bg-[#50A05C] rounded-xl flex h-11 w-1/2 items-center justify-center px-6 text-white mb-8 hover:bg-[#33723c]"
//             >
//               <span className="font-light text-white text-lg">確認</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useRouter } from "next/navigation";
// import Input from "./Input";

// type Props = {
//   getCode: (code: string) => void;
// };

// export function Code({ getCode }: Props) {
//   const router = useRouter();
//   let code = new Array<string>(6).fill("");

//   const handleClick = () => {
//     const finalCode = code.reduce((previousValue, currentValue) => {
//       return previousValue.concat(currentValue);
//     });
//     getCode(finalCode);
//   };

//   return (
//     <div className="flex justify-center items-center w-full h-screen">
//       <div className="bg-slate-500 flex flex-col p-5 border-2 rounded-xl w-[450px]">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="font-medium text-[22px] leading-[130%] md:mr-8">
//               Verify your phone
//             </h1>
//             <p className="text-black mt-2 text-base">
//               We sent you an SMS code to your phone number
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center space-x-4 mt-6 md:mt-8 pb-4">
//           {code.map((value, index) => {
//             return (
//               <Input
//                 key={index}
//                 index={index}
//                 getValue={(value, index) => {
//                   code[index] = value;
//                 }}
//               />
//             );
//           })}
//         </div>
//         <div className="flex mt-4 space-x-4">
//           <button
//             onClick={() => void router.push("/user")}
//             className="bg-white rounded-xl flex space-x-4 mb-8 text-black text-lg h-11 w-1/2 items-center justify-center px-6"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleClick}
//             className="bg-black rounded-xl flex h-11 w-1/2 items-center justify-center px-6 text-white mb-8"
//           >
//             <span className="font-light text-white text-lg">Submit</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
