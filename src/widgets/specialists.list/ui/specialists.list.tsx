'use client'
import { FC, useState } from "react";
import s from './specialists.list.module.scss'
import Image from "next/image";
import Link from "next/link";
import { CheckBox } from "@/shared/ui/checkbox";
import { Controls } from "@/widgets/controls";
import { useAppointmentStore } from "@/features/appointment/model/appointment.store";
import { useRouter } from "next/navigation";
import { Button, buttonTypes } from "@/shared/ui";

interface SpecialistsListProps {

}

const data = [

  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 4,
    reviewsCount: 20,
    soon: 'сегодня',
    time: ['12:30', '13:00', '14:30'],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 4,
    reviewsCount: 20,
    soon: 'сегодня',
    time: [ '12:30', '13:00', '14:30' ],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 4,
    reviewsCount: 20,
    soon: 'сегодня',
    time: [ '12:30', '13:00', '14:30' ],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 4,
    reviewsCount: 20,
    soon: 'сегодня',
    time: [ '12:30', '13:00', '14:30' ],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 4,
    reviewsCount: 20,
    soon: 'сегодня',
    time: [ '12:30', '13:00', '14:30' ],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 5,
    reviewsCount: 20,
    soon: 'сегодня',
    time: ['12:30', '13:00', '14:30'],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 5,
    reviewsCount: 20,
    soon: 'сегодня',
    time: ['12:30', '13:00', '14:30'],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 5,
    reviewsCount: 20,
    soon: 'сегодня',
    time: ['12:30', '13:00', '14:30'],

  },
  {

    avatar: 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png',
    name: 'Олеся Игнатьева',
    specialization: 'бровист',
    rating: 5,
    reviewsCount: 20,
    soon: 'сегодня',
    time: ['12:30', '13:00', '14:30'],

  },

]

export const SpecialistsList: FC<SpecialistsListProps> = () => {

  const { setMasterId, date, time, masterId, services } = useAppointmentStore(state => state)
  
  const router = useRouter()

  const clickHandler = () => {

    
    if ( services.length === 0 ) return router.push('/choice.service')
    if ( !time && !date && services.length !== 0  ) return router.push('/choice.date')
    router.push('/entry.confirm')

  }

  const isEndStep = date && time && services.length !== 0

  return (

    <section className={ `${ s.section } container` }>

      <h1 className="h1">
        Выбрать специалиста
      </h1>

      <ul className={`${ s.list } flex flex-col gap-20`}>

        <li className={ `${ s.item } ${ s.all_items } flex` }>

          <Image alt="peoples" src={ '/icons/peoples_full_grey.svg' } width={ 32 } height={ 32 } />

          <p className="p">
            Любой специалист
          </p>

          <CheckBox isActive = { masterId ===  10000 }  onClick = { () => setMasterId( 10000 ) } className={ s.checkbox } />

        </li>

        { data.map(( item, index ) => (

          <li className={ `${ s.item } flex gap-20` } key={ index }>

            <Image className={ s.avatar } width={ 56 } style={ { objectFit: 'cover' } } height={ 56 } alt={ item.name } src={ item.avatar } />

            <div className={s.info}>

              <p className={ `${ s.name }  p` }>{ item.name }

                <Link

                  onClick={ ( e ) => e.stopPropagation() }
                  className={ s.link } href={ '/specialist' }

                > i </Link>

              </p>
              <div className={ `${ s.main_info } flex` }>
                <p>
                  <Image className="mr-5" width={ 24 } height={ 24 } src='/icons/star.svg' alt={ 'star' } />
                  <Image className="mr-5" width={ 24 } height={ 24 } src='/icons/star.svg' alt={ 'star' } />
                  <Image className="mr-5" width={ 24 } height={ 24 } src='/icons/star.svg' alt={ 'star' } />
                  <Image className="mr-5" width={ 24 } height={ 24 } src='/icons/star.svg' alt={ 'star' } />
                  <Image className="mr-5" width={ 24 } height={ 24 } src='/icons/star.svg' alt={ 'star' } />
                </p>
                <p>{ item.reviewsCount } отзывов</p>
              </div>


            </div>

            <CheckBox isActive = { masterId ===  index }  onClick = { () => setMasterId( index ) } className={ s.checkbox } />

          </li>

        ))}
      </ul>

      <Controls >
        
        { isEndStep
        
          ? <Button

              buttonParams={{

                onClick: clickHandler,

              }}

              type = { buttonTypes.blue }
          
        
            > Оформить запись </Button>

          : <>

            <Button

              buttonParams={ {

                onClick: () => router.back(),

              } }

            > Назад </Button>

            <Button

              buttonParams={ {

                onClick: clickHandler,

              } }

              type={ buttonTypes.blue }


            > Далее </Button>

            </>

        }
        
      </Controls> 

    </section>

  );

}
