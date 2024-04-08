import React from 'react'
import { useMutation } from '@tanstack/react-query'
import useStudents from '../../../mobile/hooks/useStudents'
import { getStudents } from '../api/api'
import useAuth from '../hooks/useAuth'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { useState } from 'react'
import { useEffect } from 'react'

const Students = ({ grades, competence, assiganure }) => {

    const { user } = useAuth()
    const { students, setStudents } = useStudents()
    const [filteredStudents, setFilteredStudents] = useState(students && students.filter( student => student.clase == assiganure.clase.id) || [])
    const { mutate: getStudentsMutation, isPending, isError } = useMutation({
        mutationFn: data => getStudents(data),
        onSuccess: res => {
            setStudents(res.data)
            setFilteredStudents(res.data)
        },
        onError: err => console.log(err)
    })

    const getter = () => {
        getStudentsMutation({ token: user.access, claseId: assiganure.clase.id})
    }

    useEffect(() => {
        if (filteredStudents.length == 0) {
            getter()
        }
    })

  return (
    <div>
        {console.log('Studets',filteredStudents)}
    </div>
  )
}

export default Students