'use client'
import s from './scedule.module.scss'
import { BackButton, Button, CheckboxSwitch, DatePicker, TimeListPicker, buttonTypes } from "@/shared/ui";
import { Controls } from "@/widgets/controls";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAppointmentStore } from "@/features/appointment/model/appointment.store";

const currentDate = new Date()

currentDate.setFullYear( currentDate.getFullYear() - 1 )
const MIN_DATE = new Date( currentDate );

currentDate.setFullYear( currentDate.getFullYear() + 2 )
const MAX_DATE = new Date( currentDate );

const Page = () => {

  const { setDateAndTime, date: stateDate, time: stateTime, masterId, services } = useAppointmentStore( state => state )

  const [ date, setDate ] = useState( () => stateDate ? new Date( stateDate ) : new Date() );
  const [ time, setTime ] = useState( stateTime || '' );

  useEffect( () => {

    stateDate && setDate( () => new Date( stateDate ) )
    stateTime && setTime( stateTime )

  }, [ stateTime ] )


  return (

    <div>

      <BackButton />

      <div className="container">

        <h2 className='h2'>График работы</h2>
        
        <CheckboxSwitch />

        <DatePicker

          value={ date }
          onChange={ setDate }
          min={ MIN_DATE }
          max={ MAX_DATE }

        />
        <CheckboxSwitch />

        <TimeListPicker

          date={ moment( date ) }
          endTime="22:00"
          startTime="7:00"
          defaultValue={ stateTime || '' }
          setTime={ setTime }

        />


        <Controls >



          <Button

            type={ buttonTypes.blue }

            buttonParams={ {} }
          > Сохранить </Button>


        </Controls>

      </div>

    </div>

  )

}

export default Page