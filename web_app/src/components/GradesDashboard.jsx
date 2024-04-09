import React from 'react'
import useGrades from '../hooks/useGrades'
import { getGradesByAssignature, getActivities } from '../api/api'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useActivities from '../hooks/useActivities'
import Students from './Students'
import Activities from './Activities'
import Select from 'react-select'
import { competenciesData } from '../data/competencies'

const GradesDashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { user } = useAuth()
    const { grades, setGrades } = useGrades()
    const [ competence, setCompetence ] = useState({})
    const {activities, setActivities} = useActivities()
    const [ filteredGrades, setFilteredGrades ] = useState( grades && grades.filter( grade => grade.assignature == assignature.id) || [])

    const { mutate: getGradesByAssignatureMutation, isPending, isError } = useMutation({
        mutationFn: data => getGradesByAssignature(data),
        onSuccess: res => {
            console.log(res.data)
            setGrades( prev => ([ ...prev, ...res.data]))
            setFilteredGrades(res.data)
        },
        onError: err => console.log(err)
    })

    const { mutate: getActivitiesMutation } = useMutation({
        mutationFn: data => getActivities(data),
        onSuccess: res => setActivities(res.data),
        onError: err => console.log(err)
    })

    const getter = () => {
        getGradesByAssignatureMutation({ token: user.access, assignatureId: assignature.id })
    }

    useEffect(() => {
        // if (filteredGrades.length == 0) {
        //     getter()
        // }
        getter()
        getActivitiesMutation({ token: user.access, assignature:assignature.id })
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <div className='dashboard-container'>
        <Select 
            options={competenciesData.filter( competence => competence.area == assignature.area || competence.area == 99)}
            getOptionLabel={option => option.title}
            getOptionValue={option => option.id}
            onChange={option => setCompetence(option)}
            defaultValue={competenciesData[1].id}
            value={ competence }
        />
        <div className='table-container'>
            <Students
                assignature={assignature}
            />
            <Activities 
                grades={filteredGrades}
                assignature={assignature}
                competence={competence}
            />
        </div>
    </div>
  )
}

export default GradesDashboard