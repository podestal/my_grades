import ActivityCard from "./ActivityCard"
import useActivities from "../../hooks/useActivities"

const Activities = ({ assignature, quarter }) => {

    const { activities } = useActivities()

  return (
    <div className="grid grid-cols-4 my-8">
        
        {assignature && activities && 
            activities
            .filter( activity => activity.assignature == assignature)
            .filter ( activity => activity.quarter == quarter)
            .map(activity => (
                <ActivityCard 
                    activity={activity}
                />
        ))}
    </div>
  )
}

export default Activities