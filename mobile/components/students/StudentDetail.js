import { Text } from "react-native"
import Title from "../utils/Title"
import GradeDetail from "./GradeDetail"

const StudentDetail = ({ route }) => {

    const assignatures = route?.params?.filteredAssignatures
    const student = route?.params?.student

  return (
    <>
        {assignatures.length > 1 
        ? 
        <Text>Assignature list</Text> 
        : 
        <>
            <Title text={assignatures[0].title}/>
            <GradeDetail 
                studentId={student.id}
                assignatureId={assignatures[0].id}
            />
        </>}
    </>
  )
}

export default StudentDetail