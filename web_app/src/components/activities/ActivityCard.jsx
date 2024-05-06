import { useNavigate } from "react-router-dom"
import useGrades from "../../hooks/useGrades"
import { filterGradesByActivity } from "../../utils/filters"
import { RiCheckboxCircleLine, RiProgress2Line } from "@remixicon/react"
import { Badge } from "@tremor/react"


const ActivityCard = ({ activity }) => {

    const navigate = useNavigate()
    const {grades} = useGrades()
    const filteredGrades = grades && filterGradesByActivity(grades, activity)
    const remainingToGrade = filteredGrades && filteredGrades.filter(grade => grade.calification == 'NA').length
    const color = remainingToGrade == 0 ? 'green-500' : 'yellow-500'
    const icon = remainingToGrade == 0 ? RiCheckboxCircleLine : RiProgress2Line

  return (
    <div 
        onClick={() => navigate('/activity', { replace: true, state: activity})}
        className='text-center font-bold mx-auto my-12 py-8 w-[300px] border border-purple-950  rounded-[35px] cursor-pointer hover:bg-purple-950 shadow-violet-900 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]'
    >
        <div className='flex items-center justify-between mx-6 gap-4 mb-4'>
            <h3 className="font-poppins text-2xl">{activity.title}</h3>
            <Badge color={color} icon={icon}></Badge>
        </div>
        <i class="ri-progress-2-line"></i>
        <p>Faltan calificar: {remainingToGrade}</p>
        <div className="flex items-center justify-center gap-6 mt-6 ">
            <p>AD: <span className="text-green-500">{filteredGrades.filter(grade => grade.calification == 'AD').length}</span></p>
            <p>A: <span className="text-yellow-300">{filteredGrades.filter(grade => grade.calification == 'A').length}</span></p>
            <p>B: <span className="text-amber-500">{filteredGrades.filter(grade => grade.calification == 'B').length}</span></p>
            <p>C: <span className="text-red-500">{filteredGrades.filter(grade => grade.calification == 'C').length}</span></p>
        </div>
    </div>
  )
}

export default ActivityCard