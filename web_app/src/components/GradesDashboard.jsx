import React from 'react'
import useGrades from '../hooks/useGrades'
import { getGradesByAssignature } from '../api/api'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
    const [ name, setName ] = useState('')
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

    const getter = () => {
        getGradesByAssignatureMutation({ token: user.access, assignatureId: assignature.id })
    }

    useEffect(() => {
        getter()
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <div className='dashboard-container'>
        <Select 
            placeholder={'Selecciona una competencia'}
            options={competenciesData.filter( competence => competence.area == assignature.area || competence.area == 99)}
            getOptionLabel={option => option.title}
            getOptionValue={option => option.id}
            onChange={option => setCompetence(option)}
            value={ competence }
        />
        <input 
            placeholder='Filtrar Estudiante'
            onChange={e => setName(e.target.value)}
        />
        <div className='table-container'>
            <Students
                assignature={assignature}
                name={name}
            />
            {/* <div className='average-container'>
                <h2>Promedio</h2>
            </div> */}
            <Activities 
                grades={filteredGrades}
                assignature={assignature}
                competence={competence}
                name={name}
            />
        </div>
    </div>
  )
}

export default GradesDashboard