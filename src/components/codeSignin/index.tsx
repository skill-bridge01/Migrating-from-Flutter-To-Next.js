import { verifyUserEnrolled } from "@/firebase/authentication";
import { notify } from "@/utils/notify";
import { MultiFactorResolver } from "firebase/auth";
import { useRouter } from "next/navigation";
import { CodeSignin } from "@/components/code/CodeSignin";
import { toastNotification } from "../../components/ToastNTF";

type Props = {
  verificationId: string;
  resolver: MultiFactorResolver;
};

const CodeSignIn = ({ verificationId, resolver }: Props) => {
  const router = useRouter();

  const getCode = async (code: string) => {
    const response = await verifyUserEnrolled(
      { verificationId, resolver },
      code,
    );

    if (response) {
      toastNotification("サインアップおめでとうございます", "success", 3000);
      router.push("/chatpage");
    } else {
      toastNotification(
        "エラーが発生しました。しばらくしてからもう一度お試しください",
        "error",
        3000,
      );
    }
  };

  return <CodeSignin getCode={getCode} />;
};

export default CodeSignIn;
