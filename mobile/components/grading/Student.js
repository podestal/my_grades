import { Text, View, ScrollView, StyleSheet, Button } from "react-native"
import califications from "../../data/califications"
import Select from "../utils/Select"
import { useState } from "react"

const Student = ({ data: student }) => {

    const [calification, setCalification] = useState('')
    //setter, title, data, label

  return (
    <>
        <View style={styles.participationContainer}>
            <ScrollView contentContainerStyle={styles.studentContainer}>
                <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
                <Text style={styles.participationText}>Total: {student?.participations?.length}</Text>
            </ScrollView>
            <Select 
                setter={setCalification}
                data={califications}
                label={'calification'}
            />
            <View style={styles.buttonContainer}>
                <Text style={styles.calificationText}>{calification ? califications[calification - 1]?.calification : 'NA'}</Text>
                <Button title="Agregar"/>
            </View>
        </View>
    </>
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
    calificationsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    studentName: {
        fontSize: 22,
        marginVertical: 10
    },
    participationText: {
        fontSize: 16,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 12,
    },
    calificationText: {
        fontSize: 22
    },
    // singleButtonContainer: {
    //     height: 100,
    //     justifyContent: 'center',
    // },
})