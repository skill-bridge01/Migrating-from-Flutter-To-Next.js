import { User } from "firebase/auth";
import Link from "next/link";

import {
  verifyIfUserIsEnrolled,
  logout,
  verifyUserEmail,
} from "@/firebase/authentication";
import { notify } from "@/utils/notify";

type Props = {
  currentUser: User | null;
};

export function UserComponent({ currentUser }: Props) {
  const disconnect = () => {
    void logout();
  };

  const sendEmail = async () => {
    if (currentUser) {
      const response = await verifyUserEmail(currentUser);

      if (response) {
      } else {
      }
    }
  };

  return (
    <div className="bg-white w-full ">
      <div className="pb-32 mt-52 border-8 border-blue-500 rounded-3xl 2xl:w-1/3 xl:w-1/2 lg:w-2/3 mx-auto flex flex-col gap-24  items-center w-5/6">
        {/* <h2 className="mt-28 text-3xl text-center font-bold text-gray-800">
          Hello 👋 
        </h2> */}
        {currentUser &&
          currentUser.emailVerified &&
          !verifyIfUserIsEnrolled(currentUser) && (
            <>
              <h2 className="mt-36 text-5xl text-center font-bold text-gray-800">
                ツーファクタ認証
              </h2>
              <Link
                className="hover:text-[#50A05C] underline text-center w-full text-2xl"
                href="/mfa"
              >
                多要素認証を有効にする
              </Link>
            </>
          )}
        {currentUser &&
          !currentUser.emailVerified &&
          !verifyIfUserIsEnrolled(currentUser) && (
            <>
              <h2 className="mt-36 text-4xl text-center font-bold text-gray-800">
                メールアドレスを確認してください
              </h2>
              <button
                onClick={sendEmail}
                className="hover:text-[#50A05C] underline text-center w-full text-2xl"
              >
                確認コードを送信する
              </button>
            </>
          )}
        <button
          className="bg-[#50A05C] rounded-full flex h-14 items-center justify-center px-40 hover:bg-[#265c2d]"
          onClick={disconnect}
        >
          <span className="relative font-medium text-white text-2xl">
            切断する
          </span>
        </button>
      </div>
    </div>
  );
}
