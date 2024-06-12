import ActivityCard from "./ActivityCard"
import useActivities from "../../hooks/useActivities"
import GetGradesByAssignature from "../getters/GetGradesByAssignature"
import useGrades from "../../hooks/useGrades"
import useAuth from "../../hooks/useAuth"
import { useActivitiesQuery } from "../../tanstack/Activities"
import Loading from "../../utils/Loading"
import Error from "../../utils/Error"
import { useEffect, useState } from "react"

const Activities = ({ assignature, quarter }) => {

    // USER
    const { user } = useAuth()


    const { grades, setGrades } = useGrades()
    const filteredGradesByAssignature = grades.length > 0 && grades.filter( grade => grade.assignature == assignature) || []
    const {data: activities, isLoading, isError, error} = useActivitiesQuery(user, assignature.id)

    if (isLoading) return <Loading />

    if (isError) return <Error  error={error}/>

  return (
    <div className="grid grid-cols-4 md:grid-cols-3 my-8">
        {console.log('assignature', assignature)}
        {filteredGradesByAssignature.length == 0 
        ? 
        <GetGradesByAssignature 
            assignature={assignature}
            setGrades={setGrades}
        />
        : 
        <>
            {activities
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