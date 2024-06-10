import React from 'react'

const StudentCard = ({ student }) => {
  return (
    <div className='flex justify-between w-[970px] mx-auto'>
        <p className='text-white'>{student.first_name} {student.last_name}</p>
        {/* <button>Detalles</button> */}
        <button >Reporte</button>
    </div>
  )
}

export default StudentCard