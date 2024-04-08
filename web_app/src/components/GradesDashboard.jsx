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
import DataTable from 'react-data-table-component'

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
    const students = []
    const activities = []
    
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
    <div >
        {/* <Select 
            options={filteredCompetencies}
            getOptionLabel={ option => option.title}
            getOptionValue={ option => option.id}
            onChange={option => setSelectedCompetence(option)}
        />
        <div className='dashboard-info-container'>
            <Activities 
                competence={selectedCompetence}
                assignature={assignature}
                grades={grades}
            />
            <Students 
                grades={grades}
                competence={selectedCompetence}
                assignature={assignature}
            />
        </div> */}
        {/* <h1>Estudiantes</h1>
        <div className='grades-container'>
            <div>
                <p>.</p>
                {filteredGrades.map( (grade) => {
                    let show = true
                    if (students.indexOf(grade?.student?.id) >= 0) {
                        show = false
                    } else {
                        show = true
                        students.push(grade?.student?.id)
                    }
                    return (
                    <div key={grade.id}>
                        {show && <p>{grade?.student?.first_name} {grade?.student?.last_name}</p>}
                    </div>
                )})}
            </div>
            <div className='activity-grades-container'>
                <div className='activity-container'>
                    {filteredGrades.map( grade => {
                        let show = true
                        if (activities.indexOf(`${grade?.activity?.title}`) >= 0) {
                            show = false
                        } else {
                            show = true
                            activities.push(`${grade?.activity?.title}`)
                        }
                        return (
                            <>
                                {show && <p key={grade?.activity?.id}>{grade?.activity?.title}</p>}
                            </>
                        )
                    })}
                </div>
                <div className='calification-container'>
                    {students.map( student => {
                        return filteredGrades.map( grade => grade?.student.id == student)
                    })}
                    {/* {filteredGrades.map( grade => <p>{grade.calification}</p>)} */}
                {/* </div> */}
                <DataTable />
             </div>
        // </div>
  )
}

export default GradesDashboard