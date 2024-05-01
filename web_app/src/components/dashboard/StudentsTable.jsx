import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import useStudent from '../../hooks/useStudents'
import { getStudents } from '../../api/api'
import { useEffect } from 'react'
import DashboardTable from './DashboardTable'
import { TextInput, Select, SelectItem, Button } from '@tremor/react'
import { capacitiesData } from '../../data/capacities'
import { competenciesData } from '../../data/competencies'
import CreateActivity from './dashboardComponents/CreateActivity'

const StudentsTable = ({ activities, assignature }) => {

    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    // const capacities = capacitiesData
    const [selectedCompetency, setSelectedCompetency] = useState('all')
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

    const columns = activities &&  
        activities
            .filter( activity =>  {
                if (selectedCompetency == 'all') {
                    return activity
                }
                else {
                    if (activity.competence == selectedCompetency) {
                        return activity
                    }
                } 
                
            })
            .map( activity => {
        return {
            header: activity.title,
            accessorKey: activity.title
        }})

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

  return (
    <div className='mx-12 w-full'>
        {console.log('Competence',selectedCompetency)}
        <div className='flex w-full justify-start gap-16'>
            <div>
                <p className='text-xl mb-4'>Buscar Alumno</p>
                <TextInput placeholder='Buscar Alumno' className='mb-12 w-[240px]' value={filter} onValueChange={value => setFilter(value)}/>
            </div>
            <div className='flex-1'>
                <p className='text-xl mb-4'>Competencias</p>
                <Select value={selectedCompetency} onValueChange={ value => setSelectedCompetency(value)}>
                    <SelectItem value='all'>Todas las actividades</SelectItem>
                    {competencies.map( competency => (
                        <SelectItem value={competency.id}  key={competency.id}>{competency.title}</SelectItem>
                    ))}
                </Select>
            </div>
            <CreateActivity 
                assignature={assignature}
            />
            {/* <div>
                <p className='text-xl mb-4'>Capacidades</p>
                <MultiSelect>
                    {capacities.map(capacity => (
                        <MultiSelectItem key={capacity.id}>{capacity.title}</MultiSelectItem>
                    ))}
                </MultiSelect>
            </div> */}
        </div>

        <DashboardTable 
            columns={columns}
            studentsData={students && 
                students.data.filter( student => (
                    `${student?.first_name} ${student?.last_name}`
                    .toLowerCase()
                    .includes(filter.toLowerCase())
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