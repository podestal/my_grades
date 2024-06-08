import StudentsTable from "./StudentsTable"
import { useLocation } from "react-router-dom"
import useActivities from "../../hooks/useActivities"
import GetActivities from "../getters/GetActivities"
import DashboardHeader from "./DashboardHeader"
import useGrades from "../../hooks/useGrades"
import GetGradesByAssignature from "../getters/GetGradesByAssignature"

const Dashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { activities, setActivities } = useActivities()
    const filteredActivities = activities && activities?.filter( activity => activity.assignature == assignature.id)
    const { setGrades } = useGrades()

  return (
    <div className="text-white w-full min-h-[100vh] mt-4 overflow-x-scroll">
        <DashboardHeader 
            assignature={assignature}
        />
        <GetGradesByAssignature 
            setGrades={setGrades}
            assignature={assignature.id}
        />
        {filteredActivities.length == 0 
        ? 
        <GetActivities 
            assignature={assignature}
            setActivities={setActivities}
        />
        : 
        <StudentsTable 
            activities={filteredActivities}
            assignature={assignature}
        />
        }
    </div>
  )
}

export default Dashboard