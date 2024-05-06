import AssignatureSelector from "../../components/activities/AssignatureSelector"
import GetGradesByAssignature from "../../components/activities/GetGradesByAssignature"
import { useState } from "react"

const ActivityPage = () => {

    const [assignature, setAssignature] = useState('')

  return (
    <div className="text-white min-h-[100vh] mt-[5rem] w-full relative">
        <h2 className="text-4xl font-poppins text-center my-6">Actividades</h2>
        <AssignatureSelector 
            assignature={assignature}
            setAssignature={setAssignature}
        />
        {assignature && 
            <GetGradesByAssignature 
                assignature={assignature}
            />
        }
    </div>
  )
}

export default ActivityPage