import {create} from "zustand"
import { persist } from "zustand/middleware";

type PresentationData = {
  id: string,
  support: string,
  title: string,
  description: string,
  startedAt: number
}

interface PresentationState  {
  _data : PresentationData|null,
  code: string,
  setPresentation(obj ?: PresentationData):void,
  setAccessCode(code: string):void
}

export const presentationStore = create<PresentationState>()(
  persist(
    (set)=>({
      _data: null,
      code: "",
      setPresentation: (obj)=>{
        set({_data: obj ?? null});
      },
      setAccessCode: (code)=>{
        set({code});
      }
    }),
    {
      name: "prestoo-presentation"
    }
  )
);
