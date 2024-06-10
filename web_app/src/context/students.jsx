import { createContext, useState } from "react"

export const StudentContext = createContext()

const StudentContextProvider = ({ children }) => {

    const [students, setStudents] = useState([])

    return (
        <StudentContext.Provider value={{ students, setStudents }}>
            { children }
        </StudentContext.Provider>
    )
}

export default StudentContextProvider