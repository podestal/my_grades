import { Text } from "react-native"
import Title from "../utils/Title"
import List from "../utils/List"
import { getFilteredCompetences } from "../../data/competencies"
import Competence from "./Competence"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const StudentDetail = ({ route }) => {

    const assignatures = route?.params?.filteredAssignatures
    const student = route?.params?.student
    const competences = getFilteredCompetences(assignatures[0].area)

  return (
    <NonScrollableContainer>  
        {assignatures.length > 1 
        ? 
        <Text>Assignature list</Text> 
        : 
        <>
            <Title text={assignatures[0].title}/>
            <List 
              data={competences}
              DetailComponent={Competence}
              extraData={{ student, assignature: assignatures[0]}}
            />
        </>}
    </NonScrollableContainer>
  )
}

export default StudentDetail
