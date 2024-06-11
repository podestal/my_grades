import { useQuery } from "@tanstack/react-query"
import { getActivities } from "../../api/api"
import Loading from "../../utils/Loading"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import useActivities from "../../hooks/useActivities"

const GetActivities = ({ assignature }) => {

    const { user } = useAuth()
    const assignatureId = assignature?.id || assignature
    const {activities, setActivities} = useActivities()
    const { data: response, isLoading, isError, error } = useQuery({
        queryKey: ['activities'],
        queryFn: () => getActivities({ token: user.access, assignature: assignatureId }),
    })

    if (isLoading) return 

    useEffect(() => {
        console.log('getting acts')
        if (response) {
            if (activities.length == 0) {
                setActivities(response.data)
                
            } else {
                setActivities(prev => [...prev, ...response.data])
            }
        }
    }, [response])

    if (isLoading) return <Loading />

}

export default GetActivities