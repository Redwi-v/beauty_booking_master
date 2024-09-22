'use client'
import Image from 'next/image'
import s from './back.button.module.scss'
import { useRouter } from "next/navigation"


export const BackButton = () => {

  const router = useRouter()

  return (

    <button className={ s.button } type="button" onClick={ () => router.back() }>

      <Image width={ 40 } height={ 40 } alt="back" src={ '/icons/arrow.svg' } />

    </button>

  )

}