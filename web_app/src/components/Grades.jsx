import React from 'react'

const Grades = ({ grade }) => {

  return (
    <div className='grade-container'>
        <p>{grade.calification}</p>
    </div>
  )
}

export default Grades