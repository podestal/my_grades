import { Text, View, StyleSheet, Button } from "react-native"
import ButtonElement from "../utils/Button"

const GradeAssignments = ({ data: grade }) => {

    const handleUpdateGrade = () => {

    }

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            {console.log(grade)}
            <Text style={styles.text}>{grade?.assignment?.title}</Text>
            <Text style={styles.text}>Calificación: {grade?.calification}</Text>   
        </View>
        <View>
            <Button title="Editar" />
        </View>
                    {/* <ButtonElement 
                token: user.access, 
                assignmentId: grade.assignment, 
                gradeId: grade.id, 
                calification: { calification: selectedCalification } })
            /> */}
    </View>
  )
}

export default GradeAssignments

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        width: '60%'
    },
    text: {
        fontSize: 16,
        margin: 10
    }
})