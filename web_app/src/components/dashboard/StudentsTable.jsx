import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import useStudent from '../../hooks/useStudents'
import { getStudents } from '../../api/api'
import { useEffect } from 'react'
import DashboardTable from './DashboardTable'
import { TextInput } from '@tremor/react'

const StudentsTable = ({ activities, assignature }) => {

    const { user } = useAuth()
    const [filter, setFilter] = useState('')
    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents({ token: user.access, claseId: assignature.clase.id})
    })
    // const { students, setStudents } = useStudent()
    // const { mutate: getStudentsMutation } = useMutation({
    //     mutationFn: data => getStudents(data),
    //     onSuccess: res => {
    //         setStudents(res.data)
    //     },
    // })
    
    // const getter = () => {
    //     getStudentsMutation({ token: user.access, claseId: assignature.clase.id})
    // }

    // useEffect(() => {
    //     getter()
    // }, [])

    const columns = activities &&  activities.map( activity => {
        return {
            header: activity.title,
            accessorKey: activity.title
        }})

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

  return (
    <div className='mx-12 w-full'>
        <TextInput placeholder='Buscar Alumno' className='my-12 w-[240px]' value={filter} onValueChange={value => setFilter(value)}/>
        <DashboardTable 
            columns={columns}
            studentsData={students && 
                students.data.filter( student => (
                    `${student?.first_name} ${student?.last_name}`
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                ))
                .map( student => {

                const gradesActivity = student.grades.map( grade => {
                    const activity = String(grade.activity.title)
                    const obj = {}
                    obj[activity] = {calification: grade.calification, gradeId: grade.id}
                    return {
                        ...obj
                    }
                })
            
                return Object.assign({            
                    'firstName': student.first_name,
                    'lastName': student.last_name,
                }, ...gradesActivity)
            
            })}
        />
    </div>
  )
}

export default StudentsTable