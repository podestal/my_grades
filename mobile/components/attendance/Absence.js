import { Text, Button, View, StyleSheet } from "react-native"
import useAuth from "../../hooks/useAuth"
import { createAttendance } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Title from "../utils/Title"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import SuccessMsg from "../utils/SuccessMsg"
import ErrorMsg from "../utils/ErrorMsg"

const Absence = ({ route }) => {

    const student = route?.params?.student
    const { user } = useAuth()
    const today = new Date()
    const navigator = useNavigation()
    const [created, setCreated] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const { mutate: createAttendanceMutation } = useMutation({
        mutationFn: data => createAttendance(data),
        onSuccess: res => {
            setSuccessMsg('Ausencia creada')
            setCreated(true)},
        onError: err => setErrorMsg('Ocurrió un error, vuelva a intentarlo más tarde')
    })

    const handleSubmit = () => {
        createAttendanceMutation({
            token: user.access,
            attendance: {
                status: 'N',
                created_by: `${user.first_name} ${user.last_name}`,
                student: student.id,
            }
        })
    }

  return (
    <View>
        <Title text={'Crear Ausencia'}/>
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <View style={styles.textContainer}>
            <Text style={styles.subTitle}>Fecha:</Text>
            <Text style={styles.text}>{today.getDate()}-{today.getMonth() + 1}-{today.getFullYear()}</Text>
            <Text style={styles.subTitle}>Alumno:</Text>
            <Text style={styles.text}>{student.first_name} {student.last_name}</Text>
        </View>
        {created
        ?
        <View>
            <Button onPress={() => navigator.goBack()} title="Regresar"/>
        </View>
        :
        <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit} color={'#c0392b'} title="Confirmar"/>
            <Button onPress={() => navigator.goBack()} title="Cancelar"/>
        </View>
        }
    </View>
  )
}

export default Absence

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,  
    },
    subTitle: {
        fontSize: 28,
        marginVertical: 15,
    },
    text: {
        fontSize: 20,
        marginVertical: 12,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 48,  
    }
})