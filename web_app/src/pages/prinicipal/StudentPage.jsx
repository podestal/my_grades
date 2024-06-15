import React from 'react'
import GetStudents from '../../components/getters/GetStudents'
import useStudent from '../../hooks/useStudents'
import Students from '../../components/students/Students'
import { styles } from '../../utils/styles'
import { useStudentsQuery } from '../../hooks/useStudentsCRUD'
import useAuth from '../../hooks/useAuth'
import Loading from '../../utils/Loading'
import Error from '../../utils/Error'

const StudentPage = () => {

    // const { students, setStudents } = useStudent()
    const { user } = useAuth()
    const { data: response, isLoading, isError, error } = useStudentsQuery(user)
    const students = response && response.data

    if (isLoading) return <Loading />

    if (isError) return <Error error={error}/>
    

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>
        {console.log('students', students)}
        <Students 
            students={students}
        />
    </div>
  )
}

export default StudentPage