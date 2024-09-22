import s from './controls.module.scss'
import { FC, PropsWithChildren } from 'react'

interface IControlsProps {

  nextUrl?: string

}

export const Controls: FC<IControlsProps & PropsWithChildren> = ( { nextUrl, children } ) => {

  return (

    <div className={ s.controls }>


      { children }

    </div>

  )

}