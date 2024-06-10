import React from 'react'
import GetStudents from '../../components/getters/GetStudents'
import useStudent from '../../hooks/useStudents'
import Students from '../../components/students/Students'
import { styles } from '../../utils/styles'
import { useStudentsQuery } from '../../hooks/useStudentsCRUD'
import useAuth from '../../hooks/useAuth'

const StudentPage = () => {

    // const { students, setStudents } = useStudent()
    const { user } = useAuth()
    const { data: response, isLoading, isError } = useStudentsQuery(user)
    const students = response && response.data

    if (isLoading) return <p className='text-white flex w-full text-2xl h-[100vh] justify-center items-center'>Loading ...</p>

    if (isError) return <p>Error</p>
    

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>
        <Students 
            students={students}
        />
    </div>
  )
}

export default StudentPage