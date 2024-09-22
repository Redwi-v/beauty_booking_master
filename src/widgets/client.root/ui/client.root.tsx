'use client'

import { UserApi } from "@/shared/api";
import { FC,  ReactNode, useEffect } from "react";
import { userActiveUserStore } from "../model/active.user.store";


export const ClientRoot:FC = () => {

  const setUser = userActiveUserStore( state => state.setUser )

  useEffect(() => {

    UserApi.signIn().then( res => {

      setUser( res.data.user )

    })

  }, [])


  return null

}