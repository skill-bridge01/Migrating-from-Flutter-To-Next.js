"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import useState from "react-usestateref";
import { toastNotification } from "../../components/ToastNTF";
import { authService } from "@/services";
import ButtonPrimary from "@/components/shared/Button/ButtonPrimary";
import { logIn, updateAvatar, updateName, updateNickName } from "@/store/user";
import { useMediaQuery } from "react-responsive";
import React, { FormEvent, useEffect, useRef } from "react";
import signIn from "@/firebase/auth/signin";

type Props = {
  loginWithEmailAndPassword: (email: string, password: string) => void;
};

export function SignIn({ loginWithEmailAndPassword }: Props) {
  const [invalidForm, setInvalidForm, invalidFormRef] = useState(true);
  const [invalidEmail, setInvalidEmail, invalidEmailRef] = useState(false);
  const [invalidPass, setInvalidPass, invalidPassRef] = useState(false);
  const [isClickSubmit, SetClickSubmit] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });
  const dispatch = useDispatch();
  const hasNumber = /\d/;

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/chatpage");
  };

  useEffect(() => {
    // disconnect();

    if (email !== "" && email.includes("@")) {
      setInvalidEmail(false);
    }
    if (password.length > 6 && hasNumber.test(password)) {
      setInvalidPass(false);
    }
    if (
      email === "" ||
      !email.includes("@") ||
      password.length < 6 ||
      !hasNumber.test(password)
    ) {
      setInvalidForm(true);
    } else {
      setInvalidForm(false);
    }
  }, [email, password]);

  useEffect(() => {
    const submit = async (user: { email: string; password: string }) => {
      return await authService.login(user);
    };
    if (isClickSubmit) {
      let user = {
        email: email,
        password: password,
      };
      submit(user)
        .then((data: any) => {
          if (data.success) {
            toastNotification(data.message, "success", 3000);
            dispatch(logIn(data.access_token));
            dispatch(updateName(data.user.name));
            dispatch(updateNickName(data.user.nickname));
            dispatch(updateAvatar(data.user.avatar));
            router.push("/chatpage");
          }
        })
        .catch(() => {
          //   disconnect();
          toastNotification(
            "メールアドレスかパスワードが異なります",
            "error",
            3000,
          );
          // console.error("Error:", error);
        });
    }
  }, [isClickSubmit]);

  // function connectAccount() {

  const connectAccount = async () => {
    if (email === "" || !email.includes("@")) {
      setInvalidEmail(true);
      toastNotification("メールアドレスを入力してください。", "error", 3000);
      console.log("email");
    }
    if (password.length < 6 || !hasNumber.test(password)) {
      toastNotification("パスワードを入力してください。", "error", 3000);
      console.log("pwd");
      setInvalidPass(true);
    }
    if (!invalidEmailRef.current && !invalidPassRef.current) {
      loginWithEmailAndPassword(email, password)
        .then((response: any) => {
          if (response) {
            console.log("ok");
            toastNotification("ご登録おめでとうございます", "success", 3000);
            // router.push("/chatpage");
          } else {
            console.log("ok1");
            toastNotification(
              "ご登録おめでとうございます",
              "success",
              3000,
            );
          }
        })
        .catch(() => {
          console.log("ok2");
          toastNotification(
            "メールアドレスかパスワードが異なります",
            "error",
            3000,
          );
        });
    }
    // if (!invalidEmailRef.current && !invalidPassRef.current) {
    //   const { result, error } = await signIn(email, password);

    //   if (error) {
    //     toastNotification(
    //       "メールアドレスかパスワードが異なります",
    //       "error",
    //       3000,
    //     );
    //     return console.log(error);
    //   }

    //   // else successful

    //   toastNotification(
    //     "メールアドレスかパスワードが異なります",
    //     "success",
    //     3000,
    //   );
    //   loginWithEmailAndPassword(
    //     email,
    //     password,
    //   );
    // //   return router.push("/ChatPage");
    // }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center py-[20px]">
        <div
          className={`${
            isDesktop
              ? "text-[55px]"
              : "2xl:text-[50px] xl:text-[46px] lg:text-[40px] md:text-[36px] sm:text-[33px] text-[30px]"
          }  text-[#92d692] font-bold font-Inter mt-[150px]`}
        >
          <span
            style={{
              background:
                "linear-gradient(180deg, #A098FF 11.46%, #AC8EFF 45.83%, #5200FF 99.99%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            メンタルヘルスケアサービス
          </span>
        </div>
        <div
          className={`${
            isDesktop
              ? "w-[600px] h-[500px] mt-[60px] pt-[31px]"
              : "2xl:w-[500px] xl:w-[510px] lg:w-[430px] md:w-[440px] sm:w-[420px] 2xl:h-[420px] xl:h-[400px] lg:h-[380px] md:h-[380px] sm:h-[360px] w-[90%] h-[340px] 2xl:mt-[20px] lg:mt-[20px] md:mt-[20px] sm:mt-[18px] mt-[16px] 2xl:pt-[10px] xl:pt-[20px] pt-0"
          } relative`}
        >
          <div
            className="absolute w-full h-full left-0 top-0 md:rounded-[40px] sm:rounded-[30px] rounded-[20px] opacity-60 z-0 p-[3px]"
            style={{
              background:
                "linear-gradient(to bottom, #921DEE 56.25%, #2B2B2B 100%)",
              opacity: "0.8",
            }}
          >
            <div className="w-full h-full bg-[#0f1214] md:rounded-[40px] sm:rounded-[30px] rounded-[20px] z-10"></div>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center 2xl:px-[57px] xl:px-[40px] md:px-[48px] sm:px-[30px] px-[20px] z-10">
            <div
              className={`${
                isDesktop
                  ? "text-[32px]"
                  : "xl:text-[30px] lg:text-[24px] md:text-[23px] sm:text-[22px] text-[21px]"
              } font-semibold uppercase text-white opacity-100 z-10 2xl:mb-[35px] xl:mb-[20px] lg:mb-[13px] mb-[16px]`}
            >
              ユーザログイン
            </div>
            <div
              className={`${
                isDesktop
                  ? "h-[55px]"
                  : "2xl:h-[50px] xl:h-[50px] lg:h-[45px] sm:h-[46px] h-[45px]"
              } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
              <input
                type="text"
                placeholder="メールアドレス"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                autoComplete="off"
                className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-textwhite xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
              />
              <div className="absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
                <img
                  src="/assets/images/person.png"
                  className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                />
              </div>
            </div>
            <div
              className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px] mb-3`}
              style={{
                visibility: invalidEmailRef.current ? "visible" : "hidden",
              }}
            >
              <span className="2xl:text-[14px] md:text-[13px] text-[12px]">
                (@値を含む)
              </span>
            </div>
            <div
              className={`${
                isDesktop
                  ? "h-[55px]"
                  : "2xl:h-[50px] xl:h-[50px] lg:h-[48px] sm:h-[46px] h-[45px]"
              } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
              <input
                type="password"
                placeholder="パスワード"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                autoComplete="off"
                className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-textwhite xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
              />
              <div className=" absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
                <img
                  src="/assets/images/lock.png"
                  className="md:w-[18px] w-[17px] md:h-[20px] h-[17px]"
                />
              </div>
            </div>
            <div
              className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 mb-[5px] text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px]`}
              style={{
                visibility: invalidPassRef.current ? "visible" : "hidden",
              }}
            >
              <span className="2xl:text-[14px] md:text-[13px] text-[12px]">
                (最低 6 文字と 1 つの数字を入力してください)
              </span>
            </div>
            {/* <p className="2xl:text-[18px] md:text-[15px] text-[12px] text-[#aaa] z-20 text-left w-full pl-[20px] mb-3">
              <span
                className="cursor-pointer"
                onClick={() => router.push("/chatpage1")}
              >
                スキップ
              </span>
            </p> */}
            <ButtonPrimary
              sizeClass={`${
                isDesktop
                  ? "mt-[15px] w-[180px] h-[55px]"
                  : "2xl:mt-[10px] lg:mt-[11px] md:mt-[10px] mt-[8px] 2xl:w-[170px] xl:w-[160px] md:w-[150px] w-[140px] 2xl:h-[47px] xl:h-[45px] lg:h-[43px] sm:h-[42px] h-[40px]"
              }`}
              fontSize="font-[600] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] text-[12px]"
              className={`rounded-full`}
              onClick={connectAccount}
            >
              ログイン
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </>
  );
}
