import {Auth,createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";

import {app} from "@/firebase/init";

export const auth:Auth=getAuth(app)

export async function signInWithGoole():Promise<any> {
    try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        return true;
    }catch (e){
        return 0;
    }
}

export async function signUp(email:string, password: string):Promise<boolean> {
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
    }catch (e){
        return false;
    }
}