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
import { useAssignaturesQueryByInstructor } from '../../tanstack/Assignatures'

const Students = ({ students }) => {

    // const clasesIds = []
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const {data: assignatures, isLoading: isLoadingAssignatures, isError: isErrorAssignatures, error: assignaturesError, isSuccess} = user.profile == 'P' ? useAssignaturesQuery(user) : useAssignaturesQueryByInstructor(user)
    let clasesIds = getClasesIds(assignatures)
    const [clase, setClase] = useState('')
    const [studentName, setStudentName] = useState('')
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(currentQuarter.id)
    const {data: clases, isLoading: clasesLoading, isError} = useClasesQuery(user)
    const [reportError, setReportError] = useState(false)

    const navigator = useNavigate()

    if (isLoadingAssignatures) return <Loading />

    if (clasesLoading) return <Loading />

    if (isErrorAssignatures) return <Error error={assignaturesError}/>

    if (isError) return <Error error={isError}/>

    // if (isSuccess) {
    //     console.log('Success assignatures')
    //     clasesIds = getClasesIds(assignatures.data)
    // }

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
                assignatures={assignatures}
                quarter={quarter}
                clase={clase}
            />
        ))}
    </>

  )
}

export default Students