import React from 'react'

const Attendances = ({ attendances }) => {

    let late = 0
    let unattend = 0

    attendances.length > 0 && attendances.map( attendance => {
        if (attendance.status == 'N') {
            unattend++
        } else if (attendance.status == 'L') {
            late++
        }

    })

  return (
    <div className='flex w-[40%] gap-12 justify-start items-center'>
        <p className='text-xl font-bold font-montserrat'>Faltas: <span className='text-red-500 ml-2'>{unattend}</span></p>
        <p className='text-xl font-bold font-montserrat'>Tardanzas: <span className='text-amber-500 ml-2'>{late}</span></p>
    </div>
  )
}

export default Attendances