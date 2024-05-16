import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getStudents } from '../../api/api'
import DashboardTable from './DashboardTable'
import { competenciesData } from '../../data/competencies'
import Loading from '../../utils/Loading'
import { getCurrentQuarter } from '../../data/currentQuarter'
import calculateAverage from '../../data/calculateAverage'
import useCategories from '../../hooks/useCategories'
import DashboardFilters from './DashboardFilters'
import useGrades from '../../hooks/useGrades'
import { getActivitiesColumns, getCapacitiesColumns } from './utils/columnsData'
import GetStudents from '../getters/GetStudents'
import useStudent from '../../hooks/useStudents'
// setStudents, assignature

const StudentsTable = ({ activities, assignature }) => {

    const [selectedCompetency, setSelectedCompetency] = useState('')
    const [selectedCapacity, setSelectedCapacity] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const { students, setStudents } = useStudent()
    const studentsByAssignature = students?.filter(student => assignature?.clase?.id == student?.clase) || []
    const { categories } = useCategories()
    const { grades } = useGrades()
    const [filter, setFilter] = useState('')
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(currentQuarter.id)
    const columns = selectedCapacity ? getActivitiesColumns(activities, selectedCapacity, selectedCategory, quarter) : getCapacitiesColumns(selectedCompetency)

  return (
    <>
    {studentsByAssignature.length == 0 
    ? 
    <GetStudents 
        setStudents={setStudents}
        assignature={assignature}
    /> 
    : 
    <div className='mx-12 w-full'>
        <DashboardFilters 
            assignatureArea={assignature.area}
            filter={filter}
            setFilter={setFilter}
            selectedCompetency={selectedCompetency}
            setSelectedCompetency={setSelectedCompetency}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCapacity={selectedCapacity}
            setSelectedCapacity={setSelectedCapacity}
            quarter={quarter}
            setQuarter={setQuarter}
        />
        <DashboardTable 
            selectedCategory={selectedCategory}
            selectedCompetency={selectedCompetency}
            columns={columns}
            studentsData={students && 
                students?.filter( student => (
                    `${student?.first_name} ${student?.last_name}`
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                ))
                .map( student => {

                const studentGrades = grades.filter(grade => grade?.student?.id == student.id)
                const gradesActivity = studentGrades.map( grade => {
                    const activity = grade?.activity?.title
                    const obj = {}
                    obj[activity] = {calification: grade.calification, id: grade.id}
                    return {
                        ...obj
                    }
                })

                const average = student.averages
                    .find(average => average?.quarter == quarter && average?.competence == selectedCompetency)
                // const averageCalculated = calculateAverage(studentGrades, selectedCompetency, activities, categories, selectedCategory) || 'NA'

                // const averageObject = Object.assign({            
                //     'fullName': `${student.first_name} ${student.last_name}`,
                //     'average': average ? {calification: average?.calification, id: average.id}  : {calification: averageCalculated, id: 0},
                // }, ...gradesActivity)

                // const noAverageObject = Object.assign({            
                //     'fullName': `${student.first_name} ${student.last_name}`,
                //     'average': {calification: '-', id: 0}
                // }, ...gradesActivity)

                return Object.assign({            
                    'fullName': `${student.first_name} ${student.last_name}`,
                    'average': {calification: '-', id: 0}
                }, ...gradesActivity)
            })}
        />
    </div>
    }
    
    </>
  )
}

export default StudentsTable