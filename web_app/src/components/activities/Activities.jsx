import ActivityCard from "./ActivityCard"
import useActivities from "../../hooks/useActivities"
import GetGradesByAssignature from "../getters/GetGradesByAssignature"
import useGrades from "../../hooks/useGrades"

const Activities = ({ assignature, quarter, activities }) => {

    const { grades, setGrades } = useGrades()
    const filteredGradesByAssignature = grades.length > 0 && grades.filter( grade => grade.assignature == assignature) || []


  return (
    <div className="grid grid-cols-4 md:grid-cols-3 my-8">
        {console.log('filteredGradesByAssignature', filteredGradesByAssignature)}
        {filteredGradesByAssignature.length == 0 
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