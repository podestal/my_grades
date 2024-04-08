import React from 'react'

const Student = ({ grade }) => {
  return (
    <div>{grade?.student?.first_name} {grade?.student?.last_name}</div>
  )
}

export default Student