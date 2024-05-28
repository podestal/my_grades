import { createContext, useState } from "react"

export const CapacityContext = createContext()

const CapacityContextProvider = ({ children }) => {
    const [ capacities, setCapacities ] = useState([])

    return (
        <CapacityContext.Provider value={{ capacities, setCapacities }}>
            { children }
        </CapacityContext.Provider>
    )
}

export default CapacityContextProvider