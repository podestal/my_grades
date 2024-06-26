import React from 'react'
import { useMutation } from '@tanstack/react-query'
import useStudent from '../hooks/useStudents'
import { getStudents } from '../api/api'
import useAuth from '../hooks/useAuth'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { useState } from 'react'
import { useEffect } from 'react'
import Student from './Student'

const Students = ({ assignature, name }) => {

    const { user } = useAuth()
    const { students, setStudents } = useStudent()
    const [filteredStudents, setFilteredStudents] = useState(students && students.filter( student => student.clase == assignature.clase.id) || [])
    const { mutate: getStudentsMutation, isPending, isError } = useMutation({
        mutationFn: data => getStudents(data),
        onSuccess: res => {
            setStudents(res.data)
            setFilteredStudents(res.data)
        },
        onError: err => console.log(err)
    })

    const getter = () => {
        getStudentsMutation({ token: user.access, claseId: assignature.clase.id})
    }

    useEffect(() => {
        if (filteredStudents.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <div className='students-container'>
        <h2>Estudiantes</h2>
        {filteredStudents
        .filter( student => (
            `${student?.first_name} ${student?.last_name}`
            .toLowerCase()
            .includes(name)
        ))
        .map( student => (
            <Student 
                student={student}
            />
        ))}
    </div>
  )
}

export default Students