import { useContext } from "react"
import { CapacityContext } from "../context/capacities"

const useCapacities = () => {
    return useContext(CapacityContext)
}

export default useCapacities