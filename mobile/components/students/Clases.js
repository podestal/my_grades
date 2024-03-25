import { Text } from "react-native"
import List from "../utils/List"
import useAssignatures from "../../hooks/useAssignatures"
import Clase from "./Clase"

const Clases = () => {

    const {assignatures} = useAssignatures()
    const filteredClases = []
    const filteredAssignatures = []
    assignatures.map( assignature => {
        if (!filteredClases.includes(assignature.clase.title)) {
            filteredClases.push(assignature.clase.title)
            filteredAssignatures.push(assignature)
        }
    })

  return (
    <>
        {/* {assignatures && assignatures.map(assignature => <Clase assignature={assignature}/>)} */}
        {/* {console.log(assignatures)} */}
        {/* {console.log('filtered', filteredAssignatures)} */}
        <List 
            data={filteredAssignatures}
            DetailComponent={Clase}
        />
    </>
  )
}

export default Clases