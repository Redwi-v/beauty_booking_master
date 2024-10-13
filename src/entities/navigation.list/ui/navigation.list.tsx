import Link from "next/link";
import { FC } from "react";
import s from './navigation.list.module.scss'
import Image from "next/image";

interface NavigationListProps {
  
}

// FIXME: Убрать ели переиспользуем 
const data = [
	{
		href: '/profile',
		title: 'Личные данные',
		icon: '/icons/peoples.svg',
	},

	{
		href: '/schedule',
		title: 'График работы',
		icon: '/icons/list.svg',
	},

	{
		href: '/booking',
		title: 'Запись клиентов',
		icon: '/icons/calendar.svg',
	},
];
 
export const NavigationList: FC<NavigationListProps> = () => {

  return ( 

    <>

      <ul className={ `${ s.list } flex flex-col gap-10` }>

        { data.map( ( item, index ) => (

          <li key={ index } >

            <Link className={ `${ s.link }` } href={ item.href }>

              <div className={ `${ s.icon } flex all-center` }>

                <Image src={ item.icon } width={ 20 } height={ 20 } alt={ item.title } />

              </div>

              <p className='p'>{ item.title }</p>

            </Link>

          </li>

        ) ) }

      </ul>
    </>

  );

}
 