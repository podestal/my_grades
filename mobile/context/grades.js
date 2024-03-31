import { createContext, useState } from "react"

export const GradesContext = createContext([])

const GradesContextProvider = ({ children }) => {

    const [grades, setGrades] = useState([])

    return (
        <GradesContext.Provider value={{ grades, setGrades }}>
            { children }
        </GradesContext.Provider>
    )
}

export default GradesContextProvider