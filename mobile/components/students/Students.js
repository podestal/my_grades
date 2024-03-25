import { Text } from "react-native"
import List from "../utils/List"
import useAssignatures from "../../hooks/useAssignatures"
import Clases from "./Clases"

const Students = () => {

    const {assignatures} = useAssignatures()

  return (
    <>
        {/* <List 
            data={assignatures}
        /> */}
        <Text>Students</Text>
        <Clases />
    </>
  )
}

export default Students