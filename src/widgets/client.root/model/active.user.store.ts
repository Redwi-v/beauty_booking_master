import { IUser } from '@/shared/api'
import { create } from 'zustand'

interface IActiveUserState {

  userInfo: IUser | null

  setUser: ( userInfo: IUser ) => void

}

export const userActiveUserStore = create<IActiveUserState>()((set) => ({

  userInfo: null, 

  setUser: ( userInfo ) => set(( state ) => ({

    userInfo: userInfo

  }))

}))
