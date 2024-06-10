import React from 'react'

const StudentCard = ({ student }) => {
  return (
    <div className='flex'>
        <p className='text-white'>{student.first_name} {student.last_name}</p>
        <button >Reporte</button>
    </div>
  )
}

export default StudentCard