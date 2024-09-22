'use client'
import { Button, Input, buttonTypes } from "@/shared/ui";
import { Controls } from "@/widgets/controls";
import s from '../specialist.module.scss'
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {

  const [ image, setImage ] = React.useState( "" );
  const imageRef = React.useRef( null );

  function useDisplayImage() {
    const [ result, setResult ] = React.useState( "" );

    function uploader( e: any ) {
      const imageFile = e.target.files[ 0 ];

      const reader = new FileReader();
      reader.addEventListener( "load", ( e: any ) => {
        setResult( e.target.result );
      } );

      reader.readAsDataURL( imageFile );
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  return (

    <div>

      <Link className={ s.back } href={ '/profile' } >

        <Image width={ 40 } height={ 40 } alt="back" src={ '/icons/arrow.svg' } />

      </Link>

      <div className={ `${ s.main_data } container` }>

        <div className={ s.image_preview }>
          <label className={ s.input_preview }>
            <input
              type="file"
              onChange={ ( e: any ) => {
                setImage( e.target.files[ 0 ] );
                uploader( e );
              } }
            />

            <div className={ s.image }>

              { result && <img className={ s.preview } ref={ imageRef } src={ result } alt="" /> }
              <Image className={ s.icon } alt="photo" fill src={ '/icons/photo.svg' } />

            </div>
          </label>

          <div className={ s.text }>
            <span>Фотография профиля</span>
            <span>загрузить фото</span>
          </div>
        </div>

        <Input label="Имя" className={ s.input } inputParams={ { placeholder: 'Екатерина Петрова' } } />
        <Input label="Специалист" className={ s.input } inputParams={ { placeholder: 'Стилист-парикмахер' } } />

      </div>

      <Controls>
        <Button type={ buttonTypes.blue } buttonParams={ {} }>сохранить</Button>
      </Controls>
    </div>

  );

}
