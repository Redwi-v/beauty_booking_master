'use client'
import type { ButtonHTMLAttributes, FC, MouseEvent, PropsWithChildren } from "react";
import s from './button.module.scss'
import { useRouter } from "next/navigation";



export enum buttonTypes {

  blue

}

const buttonStyles: {[key: string]: string} = {

  [ buttonTypes.blue ]: s.blue,

}

interface ButtonProps {
  
  buttonParams: ButtonHTMLAttributes<HTMLButtonElement>,
  href?: string
  type?: buttonTypes

}
 


export const Button: FC<PropsWithChildren & ButtonProps> = ({ buttonParams , children, href, type }) => {

  const { className } = buttonParams
   const router = useRouter()


  const action = ( e: MouseEvent<HTMLButtonElement> ) => {


    if ( href ) router.push( href )
    buttonParams.onClick && buttonParams.onClick(e)

  }

  return ( 

    <button { ...buttonParams } onClick = { action } className = {`${ className } ${ s.button } ${ buttonStyles[ type || '' ] }`}>{ children }</button>

  );

}
 