import { Text, View, StyleSheet, Button } from "react-native"
import ButtonElement from "../utils/Button"

const GradeAssignments = ({ data: grade }) => {

    const handleUpdateGrade = () => {

    }

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.mainText}>{grade?.activity?.title}</Text>
            <Text style={styles.text}>Calificación: {grade?.calification}</Text>   
        </View>
        <View>
            <Button title="Editar" />
        </View>
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
    mainText: {
        fontSize: 16,
        margin: 10,
        fontWeight: 'bold'

    },
    text: {
        fontSize: 16,
        margin: 10
    }
})