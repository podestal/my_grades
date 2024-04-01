import { Text, Button, StyleSheet, View, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Student = ({ data: student }) => {

    const navigator = useNavigation()

  return (
    <View style={styles.studentContainer}>
        <ScrollView style={{marginHorizontal: 10}}>
            <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
            <Button onPress={() => navigator.navigate('Late', { student })} title="Tardanza"/>
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
        alignItems: 'center',
        marginVertical: 20,
    },
    studentName: {
        fontSize: 18,
        marginVertical: 10
    },
    buttonContainer: {
        height: 100,
        justifyContent: 'space-between',
    }
})