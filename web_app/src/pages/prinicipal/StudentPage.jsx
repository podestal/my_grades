import React from 'react'
import GetStudents from '../../components/getters/GetStudents'
import useStudent from '../../hooks/useStudents'
import Students from '../../components/students/Students'
import { styles } from '../../utils/styles'

const StudentPage = () => {

    const { students, setStudents } = useStudent()

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>
        <h2 className={`my-8 ${styles.gradientTitle}`}>Estudiantes</h2>
        {students.length == 0 
        ? 
        <GetStudents 
            setStudents={setStudents}
            all={true}
        /> 
        : 
        <Students 
            students={students}
        />
        }
    </div>
  )
}

export default StudentPage