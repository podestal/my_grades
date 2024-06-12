import ActivityCard from "./ActivityCard"
import useActivities from "../../hooks/useActivities"
import GetGradesByAssignature from "../getters/GetGradesByAssignature"
import useGrades from "../../hooks/useGrades"
import useAuth from "../../hooks/useAuth"
import { useActivitiesQuery } from "../../tanstack/Activities"
import Loading from "../../utils/Loading"
import Error from "../../utils/Error"
import { useEffect, useState } from "react"
import useAssignatures from "../../hooks/useAssignatures"
import { useQueryClient } from "@tanstack/react-query"
import { useGradesQuery } from "../../tanstack/Grades"

const Activities = ({ assignature, quarter }) => {

    // USER
    const { user } = useAuth()

    // const [selectedAssignature, setSelectedAssignature] = useState(assignature)

    //QUERY CLIENT
    const queryClient = useQueryClient()

    // useEffect(() => {
    //     setSelectedAssignature(assignature)
    //     console.log('Mounting')
    // }, [assignature])

    //SELECTED ASSIGNATURE
    // const filteredGradesByAssignature = grades.length > 0 && grades.filter( grade => grade.assignature == assignature) || []
    const activities = queryClient.getQueryData(['activities', assignature])
    const {data: grades, isLoading, isError, error} = useGradesQuery(user, assignature)

    if (isLoading) return <Loading />

    if (isError) return <Error error={error}/>

  return (
    // <div className="grid grid-cols-4 md:grid-cols-3 my-8">
    //     {console.log('assignature', assignature)}
    //     {console.log('activities', activities)}
    //     {filteredGradesByAssignature.length == 0 
    //     ? 
    //     <GetGradesByAssignature 
    //         assignature={assignature}
    //         setGrades={setGrades}
    //     />
    //     : 
    //     <>
    //         {activities
    //             .filter( activity => activity.assignature == assignature)
    //             .filter ( activity => activity.quarter == quarter)
    //             .map(activity => (
    //                 <ActivityCard 
    //                     key={activity.id}
    //                     activity={activity}
    //                     grades={grades}
    //                 />
    //         ))}
    //     </>
    //     }
    // </div>
    <div className="grid grid-cols-4 md:grid-cols-3 my-8">
        {console.log('grades', grades)}
        {console.log('activities', activities)}
        {assignature && activities
            ?.filter ( activity => activity.quarter == quarter)
            ?.map( activity => (
                <ActivityCard 
                    key={activity.id}
                    activity={activity}
                    assignature={assignature}
                    grades={grades.data}
                />
        ))}
    </div>
  )
}

export default Activities