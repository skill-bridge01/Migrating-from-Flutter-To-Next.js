"use client"

import { UserComponent as User } from "@/components/user";
import { Loading } from "@/components/Loading";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function UserPage(){
    const currentUser = useCurrentUser();
    const router = useRouter();

    if(currentUser === "loading"){
        return <Loading />
    }

    if(!currentUser){
        void router.push("/signin");
    }

    return <User currentUser={currentUser} />
}