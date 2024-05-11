import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import useStudent from '../../hooks/useStudents'
import { getStudents } from '../../api/api'
import { useEffect } from 'react'
import DashboardTable from './DashboardTable'
import { TextInput, Select, SelectItem, Button, TabGroup, TabList, Tab } from '@tremor/react'
import { capacitiesData } from '../../data/capacities'
import { competenciesData } from '../../data/competencies'
import CreateActivity from '../activities/CreateActivity'
import { RiSearchLine } from "@remixicon/react"
import Loading from '../../utils/Loading'

const StudentsTable = ({ activities, assignature }) => {

    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    // const capacities = capacitiesData
    const [selectedCompetency, setSelectedCompetency] = useState('all')
    const { user } = useAuth()
    const [filter, setFilter] = useState('')
    const [quarter, setQuarter] = useState('Q2')
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
            .filter( activity => activity.quarter == quarter)
            .map( activity => {
        return {
            header: activity.title,
            accessorKey: activity.title
        }})

    if (isLoading) return <Loading />

    if (isError) return <p>{error.message}</p>

  return (
    <div className='mx-12 w-full'>
        <div className='flex w-full justify-start gap-16'>
            <div>
                <p className='text-xl mb-4'>Buscar Alumno</p>
                <TextInput icon={RiSearchLine} placeholder='Buscar Alumno' className='mb-12 w-[240px]' value={filter} onValueChange={value => setFilter(value)}/>
            </div>
            <div className='w-full'>
                <p className='text-xl mb-4'>Competencias</p>
                <Select value={selectedCompetency} onValueChange={ value => setSelectedCompetency(value)}>
                    <SelectItem value='all'>Todas las actividades</SelectItem>
                    {competencies.map( competency => (
                        <SelectItem value={competency.id}  key={competency.id}>{competency.title}</SelectItem>
                    ))}
                </Select>
            </div>
            <div className='flex flex-col'>
                <p className="text-xl font-poppins mb-4">Bimestre</p>
                <Select value={quarter} onValueChange={ value => setQuarter(value)}>
                    <SelectItem value="Q1">B1</SelectItem>
                    <SelectItem value="Q2">B2</SelectItem>
                    <SelectItem value="Q3">B3</SelectItem>
                    <SelectItem value="Q4">B4</SelectItem>
                </Select>
            </div>
            <CreateActivity 
                assignature={assignature}
            />
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
                    const activity = activities.find( activity => activity.id == grade.activity)?.title
                    const obj = {}
                    obj[activity] = {calification: grade.calification, gradeId: grade.id}
                    return {
                        ...obj
                    }
                })
            
                return Object.assign({            
                    // 'firstName': student.first_name,
                    // 'lastName': student.last_name,
                    'fullName': `${student.first_name} ${student.last_name}`
                    // 'average': 'AD',
                }, ...gradesActivity)
            
            })}
        />
    </div>
  )
}

export default StudentsTable