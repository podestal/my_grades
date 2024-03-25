import { createContext, useState } from "react";

export const AssignatureContext = createContext()

const AssignatureContextProvider = ({ children }) => {

    const [assignatures, setAssignatures] = useState([])

    return (
        <AssignatureContext.Provider value={{ assignatures, setAssignatures }}>
            {children}
        </AssignatureContext.Provider>
    )
}

export default AssignatureContextProvider