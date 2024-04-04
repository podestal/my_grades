import { Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const StudentSummary = ({ data: student }) => {

    const level = student?.clase.level == 'S' ? 'Secundaria' : 'Primaria'
    const unattendances = student?.atendances.filter(attendance => attendance.status == 'N')
    const late = student?.atendances?.filter(attendance => attendance.status == 'L')
    const navigator = useNavigation()

    const handlePress = () => {
        navigator.navigate('TutorAssignatures', { student })
    }

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
        <Text style={styles.subTitle}>{student.first_name} {student.last_name}</Text>
        <Text style={styles.text}>{student?.clase.title} {level}</Text>
        <Text style={styles.text}>Faltas: {unattendances.length}</Text>
        <Text style={styles.text}>Tardanzas: {late.length}</Text>
    </Pressable>
  )
}

export default StudentSummary

const styles = StyleSheet.create({
    pressable: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 200,
        borderRadius: 30,   
    },
    subTitle: {
        fontSize: 28,
        textAlign: 'center',
        marginVertical: 14,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
    }
})

{/* <Pressable style={styles.pressable} onPress={handlePress}>
<Text style={styles.subTitle}>{activity.title}</Text>
<Text style={styles.text}>{activity.competence.title}</Text>
<Text style={{fontSize: 16, fontWeight:'bold'}}>Fecha de Entrega:</Text>
<Text style={styles.text}>{activity.due_date}</Text>
</Pressable>/ */}