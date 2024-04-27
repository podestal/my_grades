import StudentsTable from "./StudentsTable"
import useAuth from "../../hooks/useAuth"
import { useLocation } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { getActivities } from "../../api/api"
import { useEffect } from "react"
import useActivities from "../../hooks/useActivities"

const Dashboard = () => {

    const location = useLocation()
    const assignature = location?.state?.assignature
    const { user } = useAuth()
    const { activities, setActivities } = useActivities()
    const {mutate: getActivitiesMutation} = useMutation({
        mutationFn: data => getActivities(data),
        onSuccess: res => setActivities(res.data),
        // onError: err => console.log(err),
    })

    const getter = () => {
        getActivitiesMutation({ token: user.access, assignature:assignature.id })
    }

    useEffect(() => {
        getter()
    }, [])

// getActivitiesMutation({ token: user.access, assignature:assignature.id })

  return (
    <div className="text-white min-h-[100vh] mt-[5rem] w-full relative">
        <StudentsTable 
            activities={activities}
            assignature={assignature}
        />
    </div>
  )
}

export default Dashboard