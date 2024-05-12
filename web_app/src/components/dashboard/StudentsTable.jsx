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
import NoContent from '../../utils/NoContent'
import calculateAverage from '../../data/calculateAverage'
import useCategories from '../../hooks/useCategories'
import Selector from '../../utils/Selector'
import DashboardFilters from './DashboardFilters'
import useGrades from '../../hooks/useGrades'


const StudentsTable = ({ activities, assignature }) => {

    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    // const capacities = capacitiesData
    const [selectedCompetency, setSelectedCompetency] = useState('all')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const { categories } = useCategories()
    const { grades } = useGrades()
    const { user } = useAuth()
    const [filter, setFilter] = useState('')
    const [quarter, setQuarter] = useState('Q2')
    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents({ token: user.access, claseId: assignature.clase.id})
    })

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
            .filter( activity => {
                if (selectedCategory == 'all') {
                    return activity
                }
                else {
                    if (activity.category == selectedCategory) {
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
        <DashboardFilters 
            assignatureArea={assignature.area}
            filter={filter}
            setFilter={setFilter}
            selectedCompetency={selectedCompetency}
            setSelectedCompetency={setSelectedCompetency}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            quarter={quarter}
            setQuarter={setQuarter}
        />
        <DashboardTable 
            columns={columns}
            studentsData={students && 
                students.data.filter( student => (
                    `${student?.first_name} ${student?.last_name}`
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                ))
                .map( student => {

                const studentGrades = grades.filter(grade => grade?.student?.id == student.id)
                const gradesActivity = studentGrades
                .map( grade => {
                    const activity = grade?.activity?.title
                    const obj = {}
                    obj[activity] = {calification: grade.calification, id: grade.id}
                    return {
                        ...obj
                    }
                })

                const average = student.averages
                    .find(average => average?.quarter == quarter && average?.competence == selectedCompetency)
                const averageCalculated = calculateAverage(studentGrades, selectedCompetency, activities, categories) || 'NA'

                const averageObject = Object.assign({            
                    'fullName': `${student.first_name} ${student.last_name}`,
                    'average': average ? {calification: average?.calification, id: average.id}  : {calification: averageCalculated, id: 0},
                }, ...gradesActivity)

                const noAverageObject = Object.assign({            
                    'fullName': `${student.first_name} ${student.last_name}`,
                    'average': '-'
                }, ...gradesActivity)

                return selectedCompetency == 'all' ? noAverageObject : averageObject
            })}
        />
    </div>
  )
}

export default StudentsTable