import { useContext } from "react"
import { ActivityContext } from "../context/activities"

const useActivities = () => {
    return useContext(ActivityContext)
}

export default useActivities