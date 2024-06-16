import Averages from './Averages'
import Attendances from './Attendances'
import { getFilteredCompetenceDict } from '../../data/competencies'

const StudentCard = ({ student, assignatures, quarter, clase }) => {
  
  return (
    <div className='flex flex-col justify-between w-[970px] mx-auto gap-6'>
        <p className='text-white font-poppins text-4xl'>{student.first_name} {student.last_name}</p>
        {console.log('clase', clase)}
        <Attendances 
            attendances={student.atendances}
        />
        <div>
        {assignatures
        ?.filter(assignature => assignature?.clase.id == clase)
        ?.map(assignature => (
            <Averages 
                key={assignature.id}
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