import { useMutation, useQuery } from "@tanstack/react-query"
import useActivities from "../../hooks/useActivities"
import { getAllActivities } from "../../api/api"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import ActivityCard from "./ActivityCard"
import Loading from "../../utils/Loading"
import { filterGradesByActivity } from "../../utils/filters"

const GetActivities = ({ assignature, quarter }) => {

    // const { actiivities, setActivities } = useActivities()
    const { user } = useAuth()
    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: () => getAllActivities({ token: user.access })
    })

    if (isLoading) return <Loading />

  return (
    <div className="grid grid-cols-4 my-8">
        
        {assignature && activities && 
            activities.data
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

export default GetActivities