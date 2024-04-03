import { useContext } from "react"
import { ClaseContext } from "../context/clases"

const useClases = () => {
    return useContext(ClaseContext)
}

export default useClases