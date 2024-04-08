import React from 'react'
import useGrades from '../hooks/useGrades'
import { getGradesByAssignature, getStudents, getActivities } from '../api/api'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useStudent from '../hooks/useStudents'
import useActivities from '../hooks/useActivities'
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

// const data = [
//     {
//         name: 'Juan'
//     },    {
//         name: 'Manuel'
//     },
//     {
//         name: 'Raul'
//     }
// ]

const GradesDashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { user } = useAuth()
    const { grades, setGrades } = useGrades()
    const { students, setStudents} = useStudent()
    const {activities, setActivities} = useActivities()
    const [ filteredGrades, setFilteredGrades ] = useState( grades && grades.filter( grade => grade.assignature == assignature.id) || [])
    const [columns, setColumns] = useState([
        {
            name: 'Nombre',
            selector: row => row.name
        },

    ])
    const [data, setData] = useState([])

    const { mutate: getStudentsMutation } = useMutation({
        mutationFn: data => getStudents(data),
        onSuccess: res => setStudents(res.data),
        onError: err => console.log(err)
    })

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
        getStudentsMutation({ token: user.access, claseId: assignature.clase.id})
        getActivitiesMutation({ token: user.access, assignature:assignature.id })
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <div className='table-container'>
        <div className='students-container'>
            <h2>Estudiantes</h2>
            {students && students.map(student => <p className='student-item' key={student.id}>{student.first_name} {student.last_name}</p>)}
        </div>
        <div className='activities-container'>
            {activities && activities.map( activity => (
                <div className='activities-item'>
                    <h2>{activity?.title}</h2>
                    <div>
                        {filteredGrades && filteredGrades
                            .filter( grade => grade?.activity?.id == activity.id)
                            .map( grade => <p className='grade-item' key={grade.id}>{grade.calification}</p>)
                        }
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GradesDashboard