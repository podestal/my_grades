import { useContext } from "react"
import { AssignatureContext } from "../context/assignatures"

const useAssignatures = () => {
    return useContext(AssignatureContext)
}

export default useAssignatures