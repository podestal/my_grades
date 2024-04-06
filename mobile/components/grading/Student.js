import { Text, View, ScrollView, StyleSheet, Button } from "react-native"
import califications from "../../data/califications"
import Select from "../utils/Select"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createParticipation } from "../../api/api"
import useAuth from "../../hooks/useAuth"

const Student = ({ data: student, extraData: assignature }) => {

    const [calification, setCalification] = useState('')
    const { user } = useAuth()

    const { mutate:createParticipationMutation } = useMutation({
        mutationFn: data => createParticipation(data),
        onSuccess: res => console.log(res.data),
        onError: err => console.log(err)
    })

    const handleAddParticipation = () => {
        console.log('Assignature from part:', assignature)
        if (califications[calification - 1]?.calification ) {
            createParticipationMutation({
                token: user.access,
                participation: {
                    assignature: assignature.id,
                    calification: califications[calification - 1]?.calification,
                    student: student.id
                }
            })
        }
    }

  return (
    <>
        <View style={styles.participationContainer}>
            <ScrollView contentContainerStyle={styles.studentContainer}>
                <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
                <Text style={styles.participationText}>Hoy: {student?.participations?.length}</Text>
                <Text style={styles.participationText}>Total: {student?.participations?.length}</Text>
            </ScrollView>
            <View>
                <Select 
                    setter={setCalification}
                    data={califications}
                    label={'calification'}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.calificationText}>{calification ? califications[calification - 1]?.calification : 'NA'}</Text>
                <Button onPress={handleAddParticipation} title="Agregar"/>
            </View>
        </View>
    </>
  )
}

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
        marginBottom: 8
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 12,
    },
    calificationText: {
        fontSize: 22
    },
})