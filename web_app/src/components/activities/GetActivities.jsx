import { useMutation, useQuery } from "@tanstack/react-query"
import useActivities from "../../hooks/useActivities"
import { getAllActivities } from "../../api/api"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import ActivityCard from "./ActivityCard"

const GetActivities = ({ assignature }) => {

    // const { actiivities, setActivities } = useActivities()
    const { user } = useAuth()
    const { data: activities } = useQuery({
        queryKey: ['activities'],
        queryFn: () => getAllActivities({ token: user.access })
    })
    // const { mutate:getActivitiesMutation } = useMutation({
    //     mutationFn: data => getActivities(data),
    //     onSuccess: res => {
    //         console.log(res.data)
    //         setActivities(res.data)
    //     },
    //     onError: err => console.log(err)
    // })

    // const getter = () => {
    //     getActivitiesMutation({ token: user.access, assignature:assignature })
    // }

    // useEffect(() => {
    //     if (assignature) {
    //         getter()
    //     }
    // }, [])

  return (
    <div className="grid grid-cols-4 my-8">
        {assignature && console.log('actiivities',assignature)}
        {assignature && activities && 
            activities.data
            .filter( activity => activity.assignature == assignature)
            .map(activity => (
                <ActivityCard 
                    activity={activity}
                />
        ))}
    </div>
  )
}

export default GetActivities