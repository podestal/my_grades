import { useQuery } from "@tanstack/react-query"
import { getActivities } from "../../api/api"
import Loading from "../../utils/Loading"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"

const GetActivities = ({ assignature, setActivities }) => {

    const { user } = useAuth()
    const assignatureId = assignature?.id || assignature

    const { data: activities, isLoading, isError, error } = useQuery({
        queryKey: ['activities'],
        queryFn: () => getActivities({ token: user.access, assignature: assignatureId }),
    })

    useEffect(() => {
        if (activities) {
            setActivities(activities.data)
        }
    }, [activities])

    if (isLoading) return <Loading />

}

export default GetActivities