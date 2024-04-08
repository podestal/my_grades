import React from 'react'
import useGrades from '../hooks/useGrades'
import { getGradesByAssignature } from '../api/api'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Student from './Student'

const GradesDashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { user } = useAuth()
    const { grades, setGrades } = useGrades()
    const [ filteredGrades, setFilteredGrades ] = useState( grades && grades.filter( grade => grade.assignature == assignature.id) || [])

    const { mutate: getGradesByAssignatureMutation, isPending, isError } = useMutation({
        mutationFn: data => getGradesByAssignature(data),
        onSuccess: res => {
            setGrades( prev => ([ ...prev, ...res.data]))
            setFilteredGrades(res.data)
        },
        onError: err => console.log(err)
    })

    const getter = () => {
        getGradesByAssignatureMutation({ token: user.access, assignatureId: assignature.id })
    }

    useEffect(() => {
        if (filteredGrades.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <div>
        {filteredGrades.map( grade => <Student key={grade.id} grade={grade}/>)}
    </div>
  )
}

export default GradesDashboard