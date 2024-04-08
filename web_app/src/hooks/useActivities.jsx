import { useContext } from "react"
import { ActivitiesContext } from "../context/activities"

const useActivities = () => {
    return useContext(ActivitiesContext)
}

export default useActivities