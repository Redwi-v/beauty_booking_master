'use client'
import { FC, useEffect, useState } from "react";
import s from './time.picker.module.scss'
import moment, { Moment } from 'moment'

interface TimeListPickerProps {

  date: Moment,
  startTime: string
  endTime: string,
  setTime?: ( time: string ) => void
  defaultValue?: string

}

export const TimeListPicker: FC<TimeListPickerProps> = ( props ) => {

  const { date, endTime, startTime, setTime, defaultValue } = props 

  const times = getTimes( startTime, endTime )


  const [ activeButton, setActive ] = useState<number | null>()

  
  useEffect(() => {

    const defaultIndex = times.findIndex( time => defaultValue == time || console.log(defaultValue))

    setActive(defaultIndex)

  }, [ defaultValue ])

  useEffect(() => {

    setTime && setTime( times[ activeButton || 0 ] )

  }, [ activeButton ])


  return (

    <div className={s.time_picker}>

      <h2 className="h2">Время записи</h2>

      <ul className={`${s.list} flex`}>

        { times.map((time, index) => (

          <li key={ index }>

            <button 

              onClick = {() => setActive(index)} 
              className = {`${ s.button } ${ activeButton === index && s.active }`}

            >
              { time }
            </button>

          </li>

        ))}

      </ul>

    </div>

  );

}

function getTimes(start: string, end: string): string[] {

  let result: string[] = [];
  let current = moment(start, 'HH:mm');

  const endTime = {

    hours: end.split(':')[0],
    minutes: end.split(':')[1],

  }

  const endMoment = moment().set( 'hour', +endTime.hours ).set('minute', +endTime.minutes).set('second', 0)
  console.log( current.isBefore(moment( endMoment )) );
  

  while ( current.isBefore( endMoment ) ) {
    
    result.push(current.format('HH:mm'));
    current = moment(current).add(15, 'minutes');

  }

  return result;

}