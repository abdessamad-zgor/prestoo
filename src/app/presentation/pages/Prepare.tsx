"use client"

import React, {useState, useRef} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import {set, ref as dbRef} from "firebase/database";
import {storage, db} from "$/lib/firebase.config"
import {generateCode} from "$/lib/util";
import { presentationStore } from '$/lib/presentation';
import { useNavigate } from 'react-router-dom';

type PresentationInfo = {
  title: string,
  description: string
}

export default function Prepare() {
  const presentationID = crypto.randomUUID();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: _ } = useForm<PresentationInfo>();
  const [files, setFiles] = useState<FileList|null>(null);
  const inputFileRef = useRef<HTMLInputElement|null>(null);
  const formRef = useRef<HTMLFormElement|null>(null)
  const { setPresentation, setAccessCode} = presentationStore(state=>({setPresentation: state.setPresentation, setAccessCode: state.setAccessCode}))

  const uploadFile = async ()=>{
    if (files && files[0]) {
      try {
        let fileRef = ref(storage, files[0].name); 
        await uploadBytes(fileRef, files[0]);
        let url = await getDownloadURL(fileRef);
        return url;
      } catch(err) {
        console.error(err);
        return;
      }
    }
    return;
  }

  const onAddFile = ()=>{
    inputFileRef.current?.click();
  }

  const onSubmit: SubmitHandler<PresentationInfo> = async (data) =>{
    let presentationRef = dbRef(db, "presentations/"+presentationID);
    let url = await uploadFile();
    let presentationAccessCode = generateCode()
    if(url){
      try {
        await set(presentationRef, { id: presentationID, title: data.title, description: data.description, support: url });
        await set(dbRef(db, "access-codes/"+presentationAccessCode), presentationID );

      } catch (err) {
        console.error(err);
      }
      setPresentation({ id: presentationID, title: data.title, description: data.description, support: url });
      setAccessCode(presentationAccessCode);
      navigate("/start")
    } else 
        console.error("failed to upload the file");
  }

  return (
    <main className='w-full min-h-screen relative bg-stone-100'>
      <div className='w-full p-8'>
        <form className='border shadow rounded-lg flex justify-center items-stretch p-4 gap-4 bg-white' ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div className='basis-1/4 relative'>
            <input type="file" ref={inputFileRef} onChange={(e)=>setFiles(e.target.files)} className='hidden' />
            <div className='absolute inset-0 rounded-lg text-center text-9xl flex justify-center items-center text-stone-600 bg-zinc-300' onClick={onAddFile}>
              +
            </div>
          </div>
          <div className='basis-3/4'>
            <div className='flex flex-col gap-2 py-2'>
              <label className='text-emerald-600 underline decoration-emerald-600 font-bold decoration-4'>Titre</label>
              <input type='text' className='border shadow-inner rounded-lg focus:border-emerald-200 focus:shadow-emerald-300 text-xl p-2' {...register("title")}/>
            </div>
            <div className='flex flex-col gap-2 py-2'>
              <label className='text-emerald-600 underline decoration-emerald-600 font-bold decoration-4'>Description</label>
              <textarea style={{resize: 'none'}} className='border shadow-inner rounded-lg focus:border-emerald-200 focus:shadow-emerald-300 text-xl p-2' {...register("description")}/>
            </div>
          </div>
          <div className='absolute left-0 right-0 bottom-0 py-2 flex justify-end px-12'>
            <button className='rounded-lg p-4 font-bold text-2xl text-white bg-cyan-700' type='submit'>
              Share
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
