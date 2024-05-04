import StudentsTable from "./StudentsTable"
import useAuth from "../../hooks/useAuth"
import { useLocation } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getActivities } from "../../api/api"
import Loading from "../../utils/Loading"
import { useEffect } from "react"
import useActivities from "../../hooks/useActivities"

const Dashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { user } = useAuth()

    const { data: activities, isLoading, isError, error } = useQuery({
        queryKey: ['activities'],
        queryFn: () => getActivities({ token: user.access, assignature:assignature.id })
    })

    if (isLoading) return <Loading />

    if (isError) return <p>{error.message}</p>
    // const { activities, setActivities } = useActivities()
    // const {mutate: getActivitiesMutation} = useMutation({
    //     mutationFn: data => getActivities(data),
    //     onSuccess: res => setActivities(res.data),
    //     // onError: err => console.log(err),
    // })

    // const getter = () => {
    //     getActivitiesMutation({ token: user.access, assignature:assignature.id })
    // }

    // useEffect(() => {
    //     getter()
    // }, [])

// getActivitiesMutation({ token: user.access, assignature:assignature.id })

  return (
    <div className="text-white min-h-[100vh] mt-[8rem] max-w-[1450px] mx-auto relative">
        <StudentsTable 
            activities={activities.data}
            assignature={assignature}
        />
    </div>
  )
}

export default Dashboard