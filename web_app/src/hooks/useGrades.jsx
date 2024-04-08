import { useContext } from "react"
import { GradesContext } from "../context/grades"

const useGrades = () => {
    return useContext(GradesContext)
}

export default useGrades