'use client'
import { FC, useState } from 'react'
import s from './checkbox.switch.module.scss'
import cssIf from '@/scripts/helpers/class.add.if'


export const CheckboxSwitch: FC<{ label?: string, className?: string }> = ({ label, className }) => {

  const [ isActive, setIsActive ] = useState(false)

  return (
    <button onClick={ () => setIsActive( value => !value )  } className={`${ s.checkbox } ${ cssIf( !!className, className ) }`}>
      <span className={ s.label }>{label || 'Доступен для записи'}</span>
      <div className={`${ s.box  } ${ cssIf( isActive, s.active ) }`}>
        <span></span>
      </div>
    </button>
  )

}