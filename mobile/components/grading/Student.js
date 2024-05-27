import { Text, View, ScrollView, StyleSheet, Button } from "react-native"
import califications from "../../data/califications"
import Select from "../utils/Select"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createParticipation } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import useStudents from "../../hooks/useStudents"
import SuccessMsg from "../utils/SuccessMsg"
import ErrorMsg from "../utils/ErrorMsg"

const Student = ({ data: student, extraData: {assignature} }) => {

    const [calification, setCalification] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const { user } = useAuth()
    const { setStudents } = useStudents()
    const date = new Date()
    const today = String(date.toJSON()).split('T')[0]
    const todaysParticipations = student.participations.length > 0 && student.participations.filter( participation => participation.created_at == today)

    const { mutate:createParticipationMutation } = useMutation({
        mutationFn: data => createParticipation(data),
        onSuccess: res => {
            setStudents(prev => ( prev.map( prevStudent => {
                if (prevStudent.id == student.id) {
                    prevStudent.participations.push(res.data)
                }
                return prevStudent
            })))
            setCalification('')
            setSuccessMsg('Participación Agregada')
        },
        onError: err => {
            setErrMsg('Ocurrió un Error, vuélvalo a intentar')
            console.log(err)
        }
    })

    const handleAddParticipation = () => {
        setSuccessMsg('')
        setErrMsg('')
        if (califications[calification - 1]?.calification || califications[calification - 1]?.calification == 'NA' ) {
            createParticipationMutation({
                token: user.access,
                participation: {
                    assignature: assignature.id,
                    calification: califications[calification - 1]?.calification,
                    student: student.id
                }
            })
        }
        setTimeout(() => {
            setSuccessMsg('')
            setErrMsg('')
        }, 3000)
    }

  return (
    <>
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
        <View style={styles.participationContainer}>
            <ScrollView contentContainerStyle={styles.studentContainer}>
                <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
                <Text style={styles.participationText}>Hoy: {student?.participations?.length}</Text>
                <Text style={styles.participationText}>Total: {todaysParticipations?.length}</Text>
            </ScrollView>
            <View>
                <Select 
                    setter={setCalification}
                    data={califications}
                    label={'calification'}
                    hideSelected={'none'}
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