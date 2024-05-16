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
import getDashboardData from './utils/dashboardData'
// setStudents, assignature

const StudentsTable = ({ activities, assignature }) => {

    // LOCAL STATE DATA
    const { categories } = useCategories()
    const { grades } = useGrades()

    const [selectedCompetency, setSelectedCompetency] = useState('')
    const [selectedCapacity, setSelectedCapacity] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filter, setFilter] = useState('')
    const { students, setStudents } = useStudent()
    const studentsByAssignature = students?.filter(student => assignature?.clase?.id == student?.clase) || []
    const dashboardData = getDashboardData(studentsByAssignature, filter, grades)


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
            studentsData={dashboardData}
        />
    </div>
    }
    </>
  )
}

export default StudentsTable