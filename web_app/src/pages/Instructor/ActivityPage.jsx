import AssignatureSelector from "../../components/activities/AssignatureSelector"
import GetGradesByAssignature from "../../components/activities/GetGradesByAssignature"
import QuarterSelector from "../../components/activities/QuarterSelector"
import { useState } from "react"
import { styles } from "../../utils/styles"

const ActivityPage = () => {

    const [assignature, setAssignature] = useState('')
    const [quarter, setQuarter] = useState('Q2')

  return (
    <div className="text-white min-h-[100vh] mt-[5rem] w-full relative">
        <h2 className={`my-12 ${styles.gradientTitle}`}>Actividades</h2>
        <div className="flex items-center justify-center gap-12 w-full mx-auto">
            <AssignatureSelector 
                assignature={assignature}
                setAssignature={setAssignature}
            />
            <QuarterSelector 
                quarter={quarter}
                setQuarter={setQuarter}
            />
        </div>
        {assignature && 
            <GetGradesByAssignature 
                assignature={assignature}
                quarter={quarter}
            />
        }
    </div>
  )
}

export default ActivityPage