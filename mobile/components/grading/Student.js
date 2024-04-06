import { Text, View, ScrollView, StyleSheet, Button } from "react-native"

const Student = ({ data: student }) => {
  return (
    <View style={styles.participationContainer}>
        <ScrollView contentContainerStyle={styles.studentContainer}>
            <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
            <Text style={styles.participationText}>Participaciones: {student?.participations?.length}</Text>
        </ScrollView>
        <View>
            <Button title="Detalle"/>
        </View>
    </View>
  )
}

// style={styles.studentContainer}

export default Student

const styles = StyleSheet.create({
    participationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    studentContainer: {
        justifyContent: 'center',
        margin: 20,

    },
    studentName: {
        fontSize: 22,
        marginVertical: 10
    },
    participationText: {
        fontSize: 16,
    }
    // buttonContainer: {
    //     height: 100,
    //     justifyContent: 'space-between',
    // },
    // singleButtonContainer: {
    //     height: 100,
    //     justifyContent: 'center',
    // },
})