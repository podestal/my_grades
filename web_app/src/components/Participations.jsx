import React from 'react'
import { useMutation } from '@tanstack/react-query'
import useStudent from '../hooks/useStudents'

const Participations = () => {

    const [ students, setStudents ] = useStudent()


  return (
    <div className='participations-container'>
        <h2>Participaciones</h2>
        {console.log('From participations',students)}
    </div>
  )
}

export default Participations