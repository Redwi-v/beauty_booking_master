'use client'
import Image from "next/image";
import Link from "next/link";

import s from '../specialist.module.scss'
import { Button, Input, buttonTypes } from "@/shared/ui";
import { Controls } from "@/widgets/controls";

export default function Page() {

  return (

    <div >
      <Link className={ s.back } href={ '/profile' } >
        <Image width={ 40 } height={ 40 } alt="back" src={ '/icons/arrow.svg' } />
      </Link>


      <div className={`${ s.personal_data_controls  } container`}>
        <h1 className="h1">Личные данные</h1>

        <Input className = { s.input } label="Телефон" isRequired inputParams={ { placeholder: '8 800 333-33-33' } } />
        <Input className = { s.input } label="E-mail" inputParams={ { placeholder: 'ddddddd@dddddd.com' } } />
      </div>

      <Controls>
        <Button type={buttonTypes.blue} buttonParams={{}}>сохранить</Button>
      </Controls>

    </div>

  );

}