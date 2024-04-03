import { useContext } from "react"
import { TutorContext } from "../context/tutor"

const useTutor = () => {
    return useContext(TutorContext)
}

export default useTutor