import { Text, Button, View, StyleSheet, ScrollView } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useAuth from "../../hooks/useAuth"
import { createAttendance } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Title from "../utils/Title"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import SuccessMsg from "../utils/SuccessMsg"
import ErrorMsg from "../utils/ErrorMsg"
import moment from 'moment'
import 'moment/locale/es';
import useStudents from "../../hooks/useStudents";

const AttendanceForm = ({ student, late, title, lateHour, handler, remove }) => {

    const { user } = useAuth()
    const today = moment().locale('es').format('dddd do MMMM YYYY')
    const navigator = useNavigation()
    const [success, setSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [hour, setHour] = useState(lateHour)
    const [visible, setVisible] = useState(false)
    const { students, setStudents } = useStudents()
    const queryClient = useQueryClient()

    const { mutate: createAttendanceMutation } = useMutation({
        mutationFn: data => createAttendance(data),
        onSuccess: res => {
            late ? setSuccessMsg('Tardanza creada') : setSuccessMsg('Ausencia creada')
            setSuccess(true)
            console.log('data from api', res.data)
            setStudents( prev => prev.map( prevStudent => {
                if (prevStudent.id == student.id) {
                    prevStudent.atendances.push(res.data)
                }
                return prevStudent
            }))
        },
        onError: err => setErrorMsg('Ocurrió un error, vuelva a intentarlo más tarde')
    })

    const handleFormatHour = (time) => {
        const preFormattedHour = String(time.getHours())
        const formattedHour = preFormattedHour.length == 1 ? `0${preFormattedHour}` : preFormattedHour 
        const preFormattedMinutes = String(time.getMinutes())
        const formattedMinutes = preFormattedMinutes.length == 1 ? `0${preFormattedMinutes}` : preFormattedMinutes
        const preFormattedSeconds = String(time.getSeconds())
        const formattedSeconds = preFormattedSeconds.length == 1 ? `0${preFormattedSeconds}` : preFormattedSeconds
        setHour(`${formattedHour}:${formattedMinutes}:${formattedSeconds}`)
        setVisible(false)
    }

    const handleDelete = () => {
        setErrorMsg('')
        setSuccessMsg('')
        try {
            handler()
            setSuccessMsg('Se ha eliminado de manera exitosa')
            setSuccess(true)
        }
        catch {
            setErrorMsg('No se pudo eliminar, inténtelo nuevament en unos momentos')
        }

    }

    const handleSubmit = () => {
        if (late) {
            createAttendanceMutation({
                token: user.access,
                attendance: {
                    status: 'L',
                    created_by: `${user.first_name} ${user.last_name}`,
                    student: student.id,
                    hour,
                }
            })
        } else {
            createAttendanceMutation({
                token: user.access,
                attendance: {
                    status: 'N',
                    created_by: `${user.first_name} ${user.last_name}`,
                    student: student.id,
                }
            })
        }
    }

  return (
    <ScrollView style={{flex: 1}}>
        <Title text={title}/>
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <View style={styles.textContainer}>
            <Text style={styles.subTitle}>Fecha:</Text>
            <Text style={styles.text}>{today}</Text>
            <Text style={styles.subTitle}>Alumno:</Text>
            <Text style={styles.text}>{student.first_name} {student.last_name}</Text>
            {late && 
            <>
                <Text style={styles.subTitle}>Hora:</Text>
                <Text style={styles.text}>{hour}</Text>
                {!lateHour && <Button style={{marginVertical: 20}} onPress={() => setVisible(true)} title={hour ? 'Cambiar hora' : 'Seleccionar Hora'}/>}
            </>}
            <DateTimePickerModal 
                isVisible={visible}
                mode="time"
                onConfirm={item => {
                    handleFormatHour(item)
                }}
                onCancel={() => setVisible(false)}
                value={new Date()}
                date={new Date()}
                timeZoneName={'America/Lima'}
            />
        </View>
        {success
        ?
        <View style={{marginTop: 48, marginBottom: 20}}>
            <Button onPress={() => navigator.goBack()} title="Regresar"/>
        </View>
        :
        <View style={styles.buttonContainer}>
            {remove ? <Button onPress={handleDelete} color={'#c0392b'} title="Eliminar"/> :<Button onPress={handleSubmit} color={'#c0392b'} title="Confirmar"/>}
            <Button onPress={() => navigator.goBack()} title="Cancelar"/>
        </View>
        }
    </ScrollView>
  )
}

export default AttendanceForm

const styles = StyleSheet.create({
    textContainer: {
        marginVertical: 12,  
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 20,
    }
})