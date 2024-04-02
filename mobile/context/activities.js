import { createContext, useState } from "react"

export const ActivityContext = createContext()

const ActivityContextProvider = ({ children }) => {
    const [activities, setActivities] = useState([])

    return (
        <ActivityContext.Provider value={{ activities, setActivities }}>
            {children}
        </ActivityContext.Provider>
    )
}

export default ActivityContextProvider