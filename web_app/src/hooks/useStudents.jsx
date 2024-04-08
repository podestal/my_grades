import { useContext } from "react"
import { StudentContext } from "../context/students"

const useStudent = () => {
    return useContext(StudentContext)
}

export default useStudent