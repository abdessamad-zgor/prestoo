"use client"
import React from "react";
import {useRouter} from "next/navigation"
import {useForm, SubmitHandler} from "react-hook-form";
import {ref, get, DataSnapshot} from "firebase/database";
import {db} from "$/lib/firebase.config";
import { guestStore } from "$/lib/guest";

type AccessCode = {
  code: string
}


function VerifyCode() {
  const router = useRouter()
  const { setPresentation } = guestStore((state)=>({setPresentation: state.setPresentation}))
  const {register, handleSubmit} = useForm<AccessCode>()

  const verifyCode = async (code: string)=>{
    let codeRef = ref(db, "access-codes/"+code);
    let snapshot: DataSnapshot;
    try {
      snapshot = await get(codeRef);
      return snapshot.val();
    } catch (error) {
      console.log(error);
      return ;
    }
  }

  const onSubmit: SubmitHandler<AccessCode> = async (data)=>{
    let presentationId = await verifyCode(data.code)
    let getPresentationData = async ()=>{
      try {
        let res = await fetch(`/api/presentations/${presentationId}`);
        return res.json()
      } catch (error) {
        console.log(error);
        return ;
      }
    }

    let presentationData = await getPresentationData();

    if(presentationData && presentationId){
      setPresentation({...presentationData, id: presentationId});
      router.replace("/guest/join");
    }
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-stone-100">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded shadow-lg bg-white px-4 py-8">
        <div className="flex flex-col py-2">
          <label className="font-bold">Entrer code d'access: </label>
          <input type="text" {...register("code")} className="p-2 shadow-inner border rounded w-full text-lg"/>
        </div>
        <input type="submit" value="Verifier le code" className="px-4 py-2 w-full text-white rounded font-bold text-xl bg-indigo-600 "/>
      </form>
    </main>
  );
}

export default VerifyCode;
