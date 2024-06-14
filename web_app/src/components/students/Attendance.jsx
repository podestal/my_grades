import React from 'react'
import moment from 'moment'

const statusConverter = {
    'N': 'Falta',
    'L': 'Tardanza',
}

const Attendance = ({attendance}) => {

    const foramttedDate = moment(attendance.created_at).format('MMMM Do')

  return (
    <div className='grid grid-cols-3 gap-12 items-center w-full py-2'>
        <p 
            className={`text-xl font-montserrat font-bold
                ${attendance.status == 'N' && 'text-red-500'}
                ${attendance.status == 'L' && 'text-amber-500'}`}>
            {statusConverter[attendance.status]}:</p>
        <p className='text-xl text-white font-palanquin'>{foramttedDate}</p>
        {attendance.status == 'L' && <p className='text-xl text-white font-palanquin text-center'>{attendance?.hour}</p>}
    </div>
  )
}

export default Attendance