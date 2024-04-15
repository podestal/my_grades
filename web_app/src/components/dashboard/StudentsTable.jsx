import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import useStudent from '../../hooks/useStudents'
import { getStudents } from '../../api/api'
import { useEffect } from 'react'
import DashboardTable from './DashboardTable'

const StudentsTable = ({ activities, assignature }) => {

    const { user } = useAuth()
    const { students, setStudents } = useStudent()
    const { mutate: getStudentsMutation } = useMutation({
        mutationFn: data => getStudents(data),
        onSuccess: res => {
            const studentsData = res.data.map( student => {

                const gradesActivity = student.grades.map( grade => {
                    const activity = String(grade.activity.title)
                    const obj = {}
                    obj[activity] = grade.calification
                    return {
                        ...obj
                    }
                })
            
                return Object.assign({            
                    'firstName': student.first_name,
                    'lastName': student.last_name,
                }, ...gradesActivity)
            
            })
            setStudents(studentsData)
        },
        // onError: err => console.log(err),
    })
    
    const getter = () => {
        getStudentsMutation({ token: user.access, claseId: assignature.clase.id})
    }

    useEffect(() => {
        getter()
    }, [])

    const columns = activities &&  activities.map( activity => {
        return {
            header: activity.title,
            accessorKey: activity.title
        }})

  return (
    <div>
        <DashboardTable 
            columns={columns}
            students={students}
        />
    </div>
  )
}

export default StudentsTable