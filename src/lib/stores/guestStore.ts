import {create} from "zustand";
import {persist} from "zustand/middleware"

type PresentationData = {
  id: string,
  support: Blob,
  title: string,
  description: string,
  startedAt: number
}|null

export type Guest = {
  id: string,
  username: string
}

//type Reaction = {
//  index: number,
//  type: string,
//  reactedAt: number,
//}

type LivePresentationData = {
  currentIndex: number,
  //reactions: {}
}|null

interface PresentationState  {
  _data : PresentationData,
  _liveData: LivePresentationData,
  guest: Guest,
  setPresentation(obj ?: Partial<PresentationData>):void,
  setGuest(guest: Guest):void,
  setLiveData(obj ?: LivePresentationData|Partial<LivePresentationData>): void
}

export const guestStore = create<PresentationState>()(
  persist(
    (set)=>({
      _data: null,
      guest: {
        id: "",
        username: ""
      }, 
      _liveData: null,
      setPresentation: (obj)=>
        set((state)=>({_data: obj ? {...state._data, ...obj} as PresentationData : null})),
      setGuest: (guest)=>set({ guest }),
      setLiveData: (obj)=>set((state)=>({...state, _liveData: {...state._liveData, ...obj } as LivePresentationData}))
    }),
    {
      name: "prestoo-guest"
    }
  )
);
