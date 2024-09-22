'use client'
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import s from './input.module.scss'
import cssIf from "@/scripts/helpers/class.add.if";

interface InputProps {
  
  inputParams: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  className?: string
  label?: string
  isRequired?: boolean

}
 
export const Input: FC<InputProps> = ( props ) => {

  const { 
    inputParams: inputParasProps, className,
    label, isRequired } = props

  const { className: inputClassName, ...inputParams } = inputParasProps

  return ( 

    <label className={`${ s.wrapper } ${ cssIf( !!className, className ) }`}>

      { label && <span className = { s.label }>{ label } { isRequired && <span>*</span> }</span> }

      <input
      
        className = {`${ s.input } ${ cssIf( !!inputClassName, inputClassName ) }`} 
        { ...inputParams }
      
      />

    </label>

  );

}
 