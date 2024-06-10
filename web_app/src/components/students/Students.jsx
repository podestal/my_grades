import React from 'react'
import StudentCard from './StudentCard'
import { getClases } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import SelectClase from './filters/SelectClase'
import { useState } from 'react'
import Loading from '../../utils/Loading'
import Error from '../../utils/Error'
import FilterStudent from './filters/FilterStudent'

const Students = ({ students }) => {

    const { user } = useAuth()
    const [clase, setClase] = useState('')
    const [studentName, setStudentName] = useState('')
    const {data: clases, isLoading, isError} = useQuery({
        queryKey: ['clases'],
        queryFn: () => getClases({ token: user.access, schoolId: user.school })
    })

    if (isLoading) return <Loading />

    if (isError) return <Error />

  return (
    <>
        {console.log('clase from students', clase)}
        <div className='flex w-[970px] my-8 mx-auto justify-center items-start gap-8'>
            <FilterStudent 
                filter={studentName}
                setFilter={setStudentName}
            />
            <SelectClase 
                clase={clase}
                setClase={setClase}
                clases={clases.data}
            />
        </div>
        {students
        .filter( student => {
            if (clase == 'all') {
                return student
            }
            if (clase) {
                if (student.clase == clase) {
                    return student
                }
            } else {
                return student
            }
        })
        .filter( student => (
            `${student?.first_name} ${student?.last_name}`
            .toLowerCase()
            .includes(studentName.toLowerCase())
        ))
        .map( student => (
            <StudentCard 
                key={student.id}
                student={student}
            />
        ))}
    </>

  )
}

export default Students