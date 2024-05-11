import StudentsTable from "./StudentsTable"
import { useLocation } from "react-router-dom"
import useActivities from "../../hooks/useActivities"
import GetActivities from "../getters/GetActivities"
import DashboardHeader from "./DashboardHeader"

const Dashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { activities, setActivities } = useActivities()
    const filteredActivities = activities && activities?.filter( activity => activity.assignature == assignature.id)

  return (
    <div className="text-white min-h-[100vh] mt-[8rem] max-w-[1450px] mx-auto relative">
        <DashboardHeader 
            assignature={assignature}
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