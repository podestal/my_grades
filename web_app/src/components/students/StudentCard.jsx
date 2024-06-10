import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useAssignaturesQuery } from '../../tanstack/Assignatures'

const StudentCard = ({ student }) => {
    const {user} = useAuth
    // const {data: assignatures, isLoading: assignaturesLoading} = useAssignaturesQuery(user)    
  return (
    <div className='flex justify-between w-[970px] mx-auto'>
        <p className='text-white'>{student.first_name} {student.last_name}</p>
        {/* <button>Detalles</button> */}
        {/* {console.log('assignatures', assignatures.data)} */}
        <button >Reporte</button>
    </div>
  )
}

export default StudentCard