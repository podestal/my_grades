import { Text, View, StyleSheet } from "react-native"
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
    <View style={styles.container}>  
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
    </View>
  )
}

export default StudentDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 100,
  },
})