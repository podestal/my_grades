import { createContext, useState } from "react"

export const TutorContext = createContext()

const TutorContextProvider = ({ children }) => {

    const [tutor, setTutor] = useState({})

    return (
        <TutorContext.Provider value={{ tutor, setTutor }}>
            { children }
        </TutorContext.Provider>
    )
} 

export default TutorContextProvider