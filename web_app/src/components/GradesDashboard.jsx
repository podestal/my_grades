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
import { competenciesData } from '../data/competencies'
import Select from 'react-select'
import Activities from './Activities'
import Students from './Students'

const student = {
    "id": 6,
    "first_name": "Manuel",
    "last_name": "Paz"
}

const GradesDashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { user } = useAuth()
    const { grades, setGrades } = useGrades()
    const [ filteredGrades, setFilteredGrades ] = useState( grades && grades.filter( grade => grade.assignature == assignature.id) || [])
    const filteredCompetencies = competenciesData.filter( competence => competence.area == assignature.area)
    const [ selectedCompetence, setSelectedCompetence ] = useState('')
    
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
        <Select 
            options={filteredCompetencies}
            getOptionLabel={ option => option.title}
            getOptionValue={ option => option.id}
            onChange={option => setSelectedCompetence(option)}
        />
        <Activities 
            competence={selectedCompetence}
            assignature={assignature}
        />
        <Student 
            student={student}
            grades={grades}
            competence={selectedCompetence}
            assignature={assignature}
        />
        <Students 
            grades={grades}
            competence={selectedCompetence}
            assignature={assignature}
        />
    </div>
  )
}

export default GradesDashboard