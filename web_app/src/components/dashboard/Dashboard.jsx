import StudentsTable from "./StudentsTable"
import { useLocation } from "react-router-dom"
import useActivities from "../../hooks/useActivities"
import GetActivities from "../getters/GetActivities"
import DashboardHeader from "./DashboardHeader"
import useGrades from "../../hooks/useGrades"
import GetGradesByAssignature from "../getters/GetGradesByAssignature"
import { useActivitiesQuery } from "../../tanstack/Activities"
import useAuth from "../../hooks/useAuth"

const Dashboard = () => {

    const location = useLocation()
    const {user} = useAuth()
    const assignature = location?.state?.assignature
    // const { activities, setActivities } = useActivities()
    const {data: activities, isLoading, isError, error} = useActivitiesQuery(user, assignature.id)
    // const filteredActivities = activities && activities?.filter( activity => activity.assignature == assignature.id)
    const { setGrades } = useGrades()

    if (isLoading) return <p className='text-white flex w-full text-2xl h-[100vh] justify-center items-center'>Loading ...</p>

    if (isError) return  <p className='text-white flex w-full text-2xl h-[100vh] justify-center items-center'>{error}</p>
  return (
    <div className="text-white w-full min-h-[100vh] mt-4 overflow-x-scroll">
        {/* {console.log('filteredActivities', filteredActivities)} */}
        <DashboardHeader 
            assignature={assignature}
        />
        <GetGradesByAssignature 
            setGrades={setGrades}
            assignature={assignature?.id}
        />
        <StudentsTable 
            activities={activities}
            assignature={assignature}
        />
    </div>
  )
}

export default Dashboard