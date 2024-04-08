import React from 'react'
import { useLocation } from 'react-router-dom'

const GradesByActivity = () => {
    const location = useLocation()

  return (
    <div>
        {console.log('Hola',location?.state?.activity)}
    </div>
  )
}

export default GradesByActivity