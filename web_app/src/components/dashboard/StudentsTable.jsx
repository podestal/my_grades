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
import getDashboardData, {getAveragesForCompetencies} from './utils/dashboardData'

const StudentsTable = ({ activities, assignature }) => {

    // LOCAL STATE DATA
    const { categories } = useCategories()
    const { grades } = useGrades()
    const { students, setStudents } = useStudent()

    // FILTERS
    const [selectedCompetency, setSelectedCompetency] = useState('')
    const [selectedCapacity, setSelectedCapacity] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filter, setFilter] = useState('')

    // FILTERED STUDENTS BY ASSIGNATURE
    const studentsByAssignature = students?.filter(student => assignature?.clase?.id == student?.clase) || []

    // READY TO USE DATA
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(currentQuarter.id)
    const activitiesByQuarter = activities.filter(activity => activity.quarter == quarter)
    const dashboardData = getDashboardData(studentsByAssignature, filter, grades, selectedCompetency, selectedCapacity, selectedCategory, activitiesByQuarter, categories, quarter, assignature)



    // COLUMNS DATA
    const columns = selectedCapacity ? getActivitiesColumns(activities, selectedCapacity, selectedCategory, quarter) : getCapacitiesColumns(selectedCompetency)


    // CAPACITIES GRADES
    const capacitiesGrades = selectedCompetency != '' && getAveragesForCompetencies()
  return (
    <>
    {/* {console.log('selectedCompetence', selectedCompetency)}
    {console.log('selectedCapacity', selectedCapacity)}
    {console.log('capacitiesGrades', capacitiesGrades)} */}
    {studentsByAssignature.length == 0 
    ? 
    <GetStudents 
        setStudents={setStudents}
        assignature={assignature}
    /> 
    : 
    <div className='mx-12 w-full'>
        {/* {console.log('capacitiesGrades', capacitiesGrades)} */}
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
            selectedCapacity={selectedCapacity}
            columns={columns}
            studentsData={dashboardData}
            quarter={quarter}
            assignature={assignature}
        />
    </div>
    }
    </>
  )
}

export default StudentsTable