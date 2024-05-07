import { useContext } from "react"
import { ClasesContext } from "../context/clases"

const useClases = () => {
    return useContext(ClasesContext)
}

export default useClases