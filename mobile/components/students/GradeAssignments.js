import { Text, View, StyleSheet } from "react-native"
import ButtonElement from "../utils/Button"

const GradeAssignments = ({ data: grade }) => {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text}>{grade?.assignment?.title}</Text>
            <Text style={styles.text}>Calificación: {grade?.calification}</Text>   
        </View>
        {/* <View>
            <ButtonElement 
                title={'Modificar'}
            />
        </View> */}
                    <ButtonElement 
                title={'Modificar'}
            />
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