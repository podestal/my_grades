import React from 'react'
import StudentCard from './StudentCard'
import useAuth from '../../hooks/useAuth'
import SelectClase from './filters/SelectClase'
import { useState } from 'react'
import Loading from '../../utils/Loading'
import Error from '../../utils/Error'
import FilterStudent from './filters/FilterStudent'
import { useClasesQuery } from '../../tanstack/Clases'
import { useAssignaturesQuery } from '../../tanstack/Assignatures'
import { getCurrentQuarter } from '../../data/currentQuarter'
import QuarterFilter from './filters/QuarterFilter'
import { Button } from '@tremor/react'
import GenericCallout from '../../utils/GenericCallout'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useStudent from '../../hooks/useStudents'
import { getClasesIds } from '../../data/getClasesForInstructors'

const data = [
    {id: 1, name: 'gggg'},
    {id: 2, name: 'tttt'},
    {id: 1, name: 'gggg'},
]

const Students = ({ students }) => {

    // const clasesIds = []
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const instructorAssignatures = queryClient.getQueryData(['assignaturesByInstructor'])
    // instructorAssignatures && instructorAssignatures.map( assignature =>{
    //     if (clasesIds.indexOf(assignature.clase.id) == -1) {
    //         clasesIds.push(assignature.clase.id)
    //     }})

    const clasesIds = getClasesIds(instructorAssignatures)
    const [clase, setClase] = useState('')
    const [studentName, setStudentName] = useState('')
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(currentQuarter.id)
    const {data: clases, isLoading: clasesLoading, isError} = useClasesQuery(user)
    const {data: assignatures, isLoading: assignaturesLoading, isSuccess: assignaturesSuccess} = user.profile == 'P' && useAssignaturesQuery(user)
    const [reportError, setReportError] = useState(false)

    const navigator = useNavigate()

    if (clasesLoading || assignaturesLoading) return <p className='text-white flex w-full text-2xl h-[100vh] justify-center items-center'>Loading ...</p>

    if (isError) return <Error />

    const handleOpenReports = () => {
        setReportError(false)
        if (clase.length == 0) {
            setReportError(true)
            return
        }
        navigator('/report')
    }

  return (
    <>
        <div className='flex w-[970px] my-2 mx-auto justify-center items-start gap-8'>
            {console.log('clasesIds', clasesIds)}
            {console.log('assignatures', assignatures)}
            <FilterStudent 
                filter={studentName}
                setFilter={setStudentName}
            />
            <SelectClase 
                clase={clase}
                setClase={setClase}
                clases={clases.data}
                filter={user.profile == 'I' && clasesIds}
            />
            <QuarterFilter 
                quarter={quarter}
                setQuarter={setQuarter}
            />

        </div>
        {students
        .filter( student => (student.clase == clase))
        .filter( student => (
            `${student?.first_name} ${student?.last_name}`
            .toLowerCase()
            .includes(studentName.toLowerCase())
        ))
        .map( student => (
            <StudentCard 
                key={student.id}
                student={student}
                assignatures={assignatures ? assignatures.data : instructorAssignatures}
                quarter={quarter}
                clase={clase}
            />
        ))}
    </>

  )
}

export default Students