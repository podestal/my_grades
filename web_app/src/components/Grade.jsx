import React from 'react'

const Grade = ({ grade }) => {
  return (
    <div>
        {console.log(grade)}
        <p>{grade?.student?.first_name} {grade?.student?.last_name}</p>
        <p>Calification: {grade?.calification}</p>
    </div>
  )
}

export default Grade