import { createContext, useState } from "react";

export const CompetenciesContext = createContext()

const CompetenciesContextProvider = ({ children }) => {
    const [competencies, setCompetencies] = useState([])

    return (
        <CompetenciesContext.Provider value={{ competencies, setCompetencies }}>
            { children }
        </CompetenciesContext.Provider>
    )
}

export default CompetenciesContextProvider

