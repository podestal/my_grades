import { Text, Pressable } from "react-native"
import useAssignatures from "../../hooks/useAssignatures"
import List from "../utils/List"
import Assignature from "./Assignature"
import Title from "../utils/Title"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

const Student = ({ data: student }) => {

    const assignatures = useAssignatures()
    const [showAssignatures, setShowAssignatures] = useState(false)
    const claseId = student?.clase
    const navigator = useNavigation()
    assignatures.assignatures.map(assignature => {
        console.log('From mapping', assignature?.clase.id)
        console.log('claseId', claseId);
    })

    const filteredAssignatures = assignatures.assignatures.filter( assignature => assignature?.clase.id == claseId)

    const handlePress = () => {
        navigator.navigate('Student-Detail', {
            filteredAssignatures,
            student
        })
    }

  return (
    <>  
        <Pressable onPress={handlePress}>
            <Title text={`${student.first_name} ${student.last_name}`}/>
        </Pressable>
        {/* {showAssignatures && <List 
            data={filteredAssignatures}
            DetailComponent={Assignature}
            extraData={student}
        />} */}
    </>
  )
}

export default Student