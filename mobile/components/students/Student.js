import { Text, Pressable } from "react-native"
import useAssignatures from "../../hooks/useAssignatures"
import List from "../utils/List"
import Assignature from "./Assignature"
import { useState } from "react"

const Student = ({ data: student }) => {

    const assignatures = useAssignatures()
    const [showAssignatures, setShowAssignatures] = useState(false)
    const claseId = student?.clase
    assignatures.assignatures.map(assignature => {
        console.log('From mapping', assignature?.clase.id)
        console.log('claseId', claseId);
    })

    const filteredAssignatures = assignatures.assignatures.filter( assignature => assignature?.clase.id == claseId)

  return (
    <>  
        
        <Text>{student.first_name} {student.last_name}</Text>
        {showAssignatures && <List 
            data={filteredAssignatures}
            DetailComponent={Assignature}
        />}
    </>
  )
}

export default Student