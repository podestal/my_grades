import React from 'react'
import StudentCard from './StudentCard'
import { getClases } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
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

const Students = ({ students }) => {

    const { user } = useAuth()
    const [clase, setClase] = useState('')
    const [studentName, setStudentName] = useState('')
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(currentQuarter.id)
    const {data: clases, isLoading: clasesLoading, isError} = useClasesQuery(user)
    const {data: assignatures, isLoading: assignaturesLoading} = useAssignaturesQuery(user)

    if (clasesLoading || assignaturesLoading) return <p className='text-white flex w-full text-2xl h-[100vh] justify-center items-center'>Loading ...</p>

    if (isError) return <Error />

  return (
    <>
        <div className='flex w-[970px] my-8 mx-auto justify-center items-start gap-8'>
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
        {console.log('quarter', quarter)}
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