import { TextInput, StyleSheet, Text, ScrollView, Button, View } from "react-native"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { updateGrades } from "../../api/api"
import useGrades from "../../hooks/useGrades"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"

const ObservationForm = ({ route }) => {

    const grade = route?.params?.grade
    const [observations, setObservations] = useState(route?.params?.grade?.observations ||'')
    const { grades, setGrades } = useGrades()
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const { user } = useAuth()

    const {mutate: updateGradesMutation } = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            console.log('Observation posted', res.data)
            if (grade?.observations) {
                setSuccessMsg('Observación Modificada')
            } else {
                setSuccessMsg('Observación Agregada')
            }
            setGrades( prev => prev.map( prevGrade => {
                if (prevGrade.id == grade.id) {
                    prevGrade.observations = observations
                }

                return prevGrade
            }))
        },
        onError: err => {
            setErrMsg('Ocurrió un error, vuélvalo a intentar')
        }
    })

    const handleSubmit = () => {
        setSuccessMsg('')
        setErrMsg('')
        updateGradesMutation({ 
            token: user.access, 
            gradeId: grade.id, 
            calification: {
                observations
            }
        })
    }

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
        <Text style={styles.title}>Observaciones para {grade?.activity?.title}</Text>
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
        <Text style={styles.subTitle}>{grade?.student?.first_name} {grade?.student?.last_name}</Text>
        <Text style={styles.subTitle}>Nota: {grade?.calification}</Text>
        <Text style={styles.subTitle}>Observaciones:</Text>
        <TextInput 
            multiline={true}
            style={styles.inputField}
            onChangeText={ inputValue => setObservations(inputValue)}
            value={observations}
        />
        <View style={styles.buttonContainer}>
            <Button 
                onPress={handleSubmit} 
                title={route?.params?.grade?.observations ? 'Modificar Observaciones' : 'Agregar Observaciones'}/>
        </View>
    </ScrollView>
  )
}

export default ObservationForm

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        margin: 14,
        textAlign: 'center',
        padding: 14,
    },
    subTitle: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 16,
    },
    inputField: {
        backgroundColor: '#ecf0f1', 
        height: 130, 
        margin: 14, 
        borderRadius: 25, 
        padding: 22,
        paddingTop: 20,
        margin: 24,
    },
    buttonContainer: {
        marginVertical: 18
    }
})