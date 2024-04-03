import { useContext } from "react"
import { StudentsContext } from "../context/students"

const useStudents = () => {
    return useContext(StudentsContext)
}

export default useStudents