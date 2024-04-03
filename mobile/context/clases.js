import { createContext, useState } from "react"

export const ClaseContext = createContext()

const ClaseContextProvider = ({ children }) => {

    const [clases, setClases] = useState([])

    return (
        <ClaseContext.Provider value={{ clases, setClases }}>
            {children}
        </ClaseContext.Provider>
    )
}

export default ClaseContextProvider