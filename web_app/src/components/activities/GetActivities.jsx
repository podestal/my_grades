import { useMutation, useQuery } from "@tanstack/react-query"
import useActivities from "../../hooks/useActivities"
import { getAllActivities } from "../../api/api"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"

const GetActivities = ({ assignature }) => {

    // const { actiivities, setActivities } = useActivities()
    const { user } = useAuth()
    const { data: actiivities } = useQuery({
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
    <div>
        {assignature && console.log('actiivities',actiivities.data)}
    </div>
  )
}

export default GetActivities