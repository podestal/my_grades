import { Text, Button, View, StyleSheet } from "react-native"
import useAuth from "../../hooks/useAuth"
import { createAttendance } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Title from "../utils/Title"
import { useNavigation } from "@react-navigation/native"

const Absence = ({ route }) => {

    const student = route?.params?.student
    const { user } = useAuth()
    const today = new Date()
    const navigator = useNavigation()

    const { mutate: createAttendanceMutation } = useMutation({
        mutationFn: data => createAttendance(data),
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
        {console.log('date:', today.getMonth())}
        <Title text={'Crear Ausencia'}/>
        <View style={styles.textContainer}>
            <Text style={styles.subTitle}>Fecha:</Text>
            <Text style={styles.text}>{today.getDate()}-{today.getMonth() + 1}-{today.getFullYear()}</Text>
            <Text style={styles.subTitle}>Alumno:</Text>
            <Text style={styles.text}>{student.first_name} {student.last_name}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit} color={'#c0392b'} title="Confirmar"/>
            <Button onPress={() => navigator.goBack()} title="Cancelar"/>
        </View>
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