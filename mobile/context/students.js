import { createContext, useState } from "react"

export const StudentsContext = createContext()

const StudentContextProvider = ({ children }) => {

    const [students, setStudents] =useState([])

    return (
        <StudentsContext.Provider value={{ students, setStudents }}>
            {children}
        </StudentsContext.Provider>
    )
}

export default StudentContextProvider