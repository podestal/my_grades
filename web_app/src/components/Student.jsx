import React from 'react'
import Grades from './Grades'

const Student = ({ student }) => {
  return (
    <>
        <p className='student-item' key={student.id}>{student.first_name} {student.last_name}</p>
    </>
  )
}

export default Student
