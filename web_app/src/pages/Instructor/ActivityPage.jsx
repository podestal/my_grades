import AssignatureSelector from "../../components/activities/AssignatureSelector"
import GetActivities from "../../components/activities/GetActivities"
import { useState } from "react"

const ActivityPage = () => {

    const [assignature, setAssignature] = useState('')

  return (
    <div className="text-white min-h-[100vh] mt-[5rem] w-full relative">
        {console.log('assignature',assignature)}
        <h2 className="text-4xl font-poppins text-center my-6">Actividades</h2>
        <AssignatureSelector 
            assignature={assignature}
            setAssignature={setAssignature}
        />
        <GetActivities 
            assignature={assignature}
        />
    </div>
  )
}

export default ActivityPage