import { FC } from "react";
import s from './start.preview.module.scss'
import Link from "next/link";
import type { IStartPreviewInfo } from "../types/types";
import Image from "next/image";

interface StartPreviewProps {

  href: string
  info: IStartPreviewInfo

}

export const StartPreview: FC<StartPreviewProps> = ( { href, info } ) => {

  const { profession, rating, logo, name } = info

  return (

    <div className={ `${ s.link } flex flex-col items-center` } >

      <Image className={ s.logo } quality={ 100 } width={ 80 } height={ 80 } src={ logo } alt={ name } />

      <div className={ `${ s.info } pt-10` }>

        <h1>{ name }</h1>
        <h3>{ profession }</h3>

      </div>

      <div className={ s.reviews }>

        <div className={ s.stars }>
          <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
          <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
          <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
          <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
          <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
        </div>

        <span className={ s.count } >20 Отзывов</span>

      </div>

    </div>

  );

}

