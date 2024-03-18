import { useContext } from "react"
import { CompetenciesContext } from "../context/competencies"

const useCompetencies = () => {
    return useContext(CompetenciesContext)
}

export default useCompetencies