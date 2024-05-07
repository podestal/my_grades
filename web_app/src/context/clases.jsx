import { createContext, useState } from "react"

export const ClasesContext = createContext()

const ClasesContextProvider = ({ children }) => {
    const [clases, setClases] = useState([])

    return (
        <ClasesContext.Provider value={{ clases, setClases }}>
            { children }
        </ClasesContext.Provider>
    )
}

export default ClasesContextProvider