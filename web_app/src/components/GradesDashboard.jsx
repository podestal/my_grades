import React from 'react'
import useGrades from '../hooks/useGrades'
import { getGradesByAssignature, getStudents, getActivities } from '../api/api'
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
        onSuccess: res => {
            res.data.map(student => {
                setData( prev => ([ ...prev, {name: `${student.first_name} ${student.last_name}`}]))
            })
        },
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
        onSuccess: res => {
            res.data.map(activity => setColumns(prev => ([ ...prev, {name: activity.title} ])))
        },
        onError: err => console.log(err)
    })

    const getter = () => {
        getGradesByAssignatureMutation({ token: user.access, assignatureId: assignature.id })
    }

    useEffect(() => {
        // if (filteredGrades.length == 0) {
        //     getter()
        // }
        // getter()
        getStudentsMutation({ token: user.access, claseId: assignature.clase.id})
        getActivitiesMutation({ token: user.access, assignature:assignature.id })
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <>
        <DataTable 
            columns={columns}
            data={data}
            onRowClicked={item => console.log('clicked', item)}
            
        />
    </>
  )
}

export default GradesDashboard