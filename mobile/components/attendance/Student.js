import { Text, Button, StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Student = ({ data: student }) => {

    const navigator = useNavigation()

  return (
    <View style={styles.studentContainer}>
        <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
        <View>
            <Button color={'#e67e22'} title="Tardanza"/>
            <Button onPress={() => navigator.navigate('Absence', { student })} color={'#c0392b'} title="Ausencia"/>
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