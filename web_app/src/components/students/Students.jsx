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

const Students = ({ students }) => {

    const { user } = useAuth()
    const [clase, setClase] = useState('')
    const [studentName, setStudentName] = useState('')
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(currentQuarter.id)
    const {data: clases, isLoading: clasesLoading, isError} = useClasesQuery(user)
    const {data: assignatures, isLoading: assignaturesLoading} = useAssignaturesQuery(user)
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
            <FilterStudent 
                filter={studentName}
                setFilter={setStudentName}
            />
            <SelectClase 
                clase={clase}
                setClase={setClase}
                clases={clases.data}
            />
            <QuarterFilter 
                quarter={quarter}
                setQuarter={setQuarter}
            />
        </div>
        {/* The report is going to wait due that SIEGIE is doing that automatically*/}
        {/* <div className='flex flex-col w-full items-center justify-center mb-8 gap-8'>
            {reportError && <GenericCallout conditionalMsg={'Tiene que seleccionar una clase'} title={'Error'} color={'red'}/>}
            <Button onClick={() => handleOpenReports()} variant='secondary'>Reporte</Button>
        </div> */}
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
                assignatures={assignatures.data.filter(assignature => assignature.clase.id == clase)}
                quarter={quarter}
            />
        ))}
    </>

  )
}

export default Students