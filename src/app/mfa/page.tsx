"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import Loading from "../loading1";
import CreateMultiFactorAuthentication from "@/components/createMultiFactorAuthentication";

const MFAPage = () => {
  const currentUser = useCurrentUser();
  console.log("currtentUser", currentUser);
  const router = useRouter();

  if (currentUser === "loading") {
    return <Loading />;
  }

  if(!currentUser){
      void router.push("/signin");
  }

  return (
    <div>
      <CreateMultiFactorAuthentication currentUser={currentUser} />
    </div>
  );
};

export default MFAPage;
