'use client'
import { Button, Textarea, buttonTypes } from "@/shared/ui";
import s from '../specialist.module.scss'
import Link from "next/link";
import Image from "next/image";
import { Controls } from "@/widgets/controls";

export default function Page() {

  return (

    <div>

      <Link className={ s.back } href={ '/profile' } >

        <Image width={ 40 } height={ 40 } alt="back" src={ '/icons/arrow.svg' } />

      </Link>

      <div className="container" style={ { marginTop: 16 } }>
        <Textarea label="О специалисте" textAreaParams={ { placeholder: 'Что нибудь о себе' } } />
      </div>

      <Controls>
        <Button type={buttonTypes.blue} buttonParams={{}}>сохранить</Button>
      </Controls>

    </div>

  );

}