import { Text, Button, StyleSheet, View, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Student = ({ data: student }) => {

    const navigator = useNavigation()
    const date = new Date()
    const today = String(date.toJSON()).split('T')[0]
    const todayAttendence = student?.atendances.filter( attendence => attendence.created_at == today)
    const attendanceId = todayAttendence[0]?.id
    const attendanceStatus = todayAttendence[0]?.status


  return (
    <View style={styles.studentContainer}>
        <ScrollView style={{marginHorizontal: 10}}>
            <Text style={styles.studentName}>{student.first_name} {student.last_name}</Text>
            {todayAttendence.length == 0 
            ? 
            <Text style={styles.presentText}>Presente</Text> 
            : 
            <>
                {todayAttendence[0].status == 'L' ? <Text style={styles.lateText}>Tardanza</Text> : <Text style={styles.absentText}>Ausente</Text>}
            </>
            }
        </ScrollView>
        {todayAttendence.length == 0 
        ?
        <View style={styles.buttonContainer}>
            <Button onPress={() => navigator.navigate('Late', { student })} title="Tardanza"/>
            <Button onPress={() => navigator.navigate('Absence', { student })} color={'#c0392b'} title="Ausencia"/>
        </View>
        :
        <View style={styles.buttonContainer}>
            <Button onPress={() => navigator.navigate('Absence', { student })} title="Modificar"/>
            <Button onPress={() => navigator.navigate('RemoveAbsence', { student, todayAttendence })} color={'#c0392b'} title="Eliminar"/>
        </View>
        }
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
    },
    absentText: {
        backgroundColor: '#c0392b',
        color: '#fff',
        padding:5,
        width: 100,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    presentText: {
        backgroundColor: '#2ecc71',
        color: '#ecf0f1',
        padding:5,
        width: 100,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    lateText: {
        backgroundColor: '#e67e22',
        color: '#ecf0f1',
        padding:5,
        width: 100,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
})