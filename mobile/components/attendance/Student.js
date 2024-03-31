import { Text, Button, StyleSheet, View } from "react-native"

const Student = ({ data: student }) => {
  return (
    <View style={styles.studentContainer}>
        <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
        <View>
        <Button title="Tardanza"/>
        <Button title="Ausencia"/>
        </View>
    </View>
  )
}

export default Student

const styles = StyleSheet.create({
    studentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    studentName: {
        fontSize: 20,
        marginVertical: 10
    }
})