import { Text } from "react-native"
import List from "../utils/List"
import useAssignatures from "../../hooks/useAssignatures"

const Students = ({ route }) => {

    const {assignatures} = useAssignatures()
    const claseId = route?.params?.claseId

  return (
    <>
        <Text>Clase Id: {claseId}</Text>
    </>
  )
}

export default Students