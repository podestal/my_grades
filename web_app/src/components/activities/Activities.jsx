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

const Activities = ({ assignature, quarter }) => {

    //QUERY CLIENT
    const queryClient = useQueryClient()

    //SELECTED ASSIGNATURE
    const { grades, setGrades } = useGrades()
    const filteredGradesByAssignature = grades.length > 0 && grades.filter( grade => grade.assignature == assignature) || []
    const activities = queryClient.getQueryData(['activities', assignature])

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