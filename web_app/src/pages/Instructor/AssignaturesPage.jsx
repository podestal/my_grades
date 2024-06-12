import React from 'react'
import GetAssignatures from '../../components/getters/GetAssignatures'
import Assignatures from '../../components/assignatures/Assignatures'
import { styles } from '../../utils/styles'
import useAssignatures from '../../hooks/useAssignatures'
import useAuth from '../../hooks/useAuth'
import { useAssignaturesQueryByInstructor } from '../../tanstack/Assignatures'
import Loading from '../../utils/Loading'
import Error from '../../utils/Error'

const AssignaturesPage = () => {

  const { user } = useAuth()
  console.log('user',user)
  const {data: assignatures, isLoading, isError, error} = useAssignaturesQueryByInstructor(user)

  if (isLoading) return <Loading />

  if (isError) return <Error error={error}/>

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>
      {console.log('user', user)}
      <h2 className={`my-12 ${styles.gradientTitle}`}>Cursos</h2>
      <Assignatures 
        assignatures={assignatures}
      />
    </div>
  )
}

export default AssignaturesPage