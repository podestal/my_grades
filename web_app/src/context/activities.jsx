import { createContext, useState } from "react"

export const ActivitiesContext = createContext()

const ActivitiesContextprovider = ({ children }) => {

    const [ activities, setActivities ] = useState([])

    return (
        <ActivitiesContext.Provider value={{ activities, setActivities }}>
            { children }
        </ActivitiesContext.Provider>
    )
}

export default ActivitiesContextprovider