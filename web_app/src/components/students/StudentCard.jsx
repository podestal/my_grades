import Averages from './Averages'
import Attendances from './Attendances'
import { getFilteredCompetenceDict } from '../../data/competencies'

const StudentCard = ({ student, assignatures, quarter }) => {
  
  return (
    <div className='flex flex-col justify-between w-[970px] mx-auto gap-6'>
        <p className='text-white font-poppins text-4xl'>{student.first_name} {student.last_name}</p>
        {console.log('student', student)}
        <Attendances 
            attendances={student.atendances}
        />
        <div>
        {assignatures.map(assignature => (
            <Averages 
                averages={student.averages
                    .filter(average => average.assignature == assignature.id)
                    .filter(average => average.quarter == quarter)
                }
                assignature={assignature}
                competences={getFilteredCompetenceDict(assignature.area)}
            />
        ))}
        </div>
        
    </div>
  )
}

export default StudentCard