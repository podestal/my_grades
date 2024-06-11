import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useAssignaturesQuery } from '../../tanstack/Assignatures'
import Averages from './Averages'
import { getFilteredCompetenceDict } from '../../data/competencies'

const StudentCard = ({ student, assignatures, competences }) => {
    const {user} = useAuth
    // const {data: assignatures, isLoading: assignaturesLoading} = useAssignaturesQuery(user)    
  return (
    <div className='flex flex-col justify-between w-[970px] mx-auto gap-6'>
        <p className='text-white font-poppins text-3xl'>{student.first_name} {student.last_name}</p>
        <div>
        {/* {student.averages.map( average => <p key={average.id}>{assignaturesDict[average.assignature].title} {average.calification}</p>)} */}
        {assignatures.map(assignature => (
            <Averages 
                averages={student.averages.filter(average => average.assignature == assignature.id)}
                assignature={assignature}
                competences={getFilteredCompetenceDict(assignature.area)}
            />
        ))}
        </div>
        
    </div>
  )
}

export default StudentCard