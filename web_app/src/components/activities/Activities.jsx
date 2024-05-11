import ActivityCard from "./ActivityCard"
import useActivities from "../../hooks/useActivities"
import GetGradesByAssignature from "../getters/GetGradesByAssignature"
import useGrades from "../../hooks/useGrades"

const Activities = ({ assignature, quarter, activities }) => {

    const { grades, setGrades } = useGrades()


  return (
    <div className="grid grid-cols-4 my-8">
        {grades.length == 0 
        ? 
        <GetGradesByAssignature 
            assignature={assignature}
            setGrades={setGrades}
        />
        : 
        <>
            {assignature && activities && 
                activities
                .filter( activity => activity.assignature == assignature)
                .filter ( activity => activity.quarter == quarter)
                .map(activity => (
                    <ActivityCard 
                        key={activity.id}
                        activity={activity}
                        grades={grades}
                    />
            ))}
        </>
        }
    </div>
  )
}

export default Activities