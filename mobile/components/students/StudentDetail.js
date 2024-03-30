import { Text } from "react-native"
import Title from "../utils/Title"
import GradeDetail from "./GradeDetail"
import List from "../utils/List"
import { getFilteredCompetences } from "../../data/competencies"
import Competence from "./Competence"

const StudentDetail = ({ route }) => {

    const assignatures = route?.params?.filteredAssignatures
    const student = route?.params?.student
    const competences = getFilteredCompetences(assignatures[0].area)

  return (
    <>  
        {assignatures.length > 1 
        ? 
        <Text>Assignature list</Text> 
        : 
        <>
            <Title text={assignatures[0].title}/>
            <List 
              data={competences}
              DetailComponent={Competence}
            />
            <GradeDetail 
                studentId={student.id}
                assignatureId={assignatures[0].id}
            />
        </>}
    </>
  )
}

export default StudentDetail