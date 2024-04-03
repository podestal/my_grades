import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Attendance from '../components/attendance/Attendance'
import Absence from '../components/attendance/Absence'
import Late from '../components/attendance/Late'
import RemoveAbsence from '../components/attendance/RemoveAbsence'

const AttendanceNavigator = () => {

    const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',              
            headerTitleStyle: {
                fontSize: 25,
            },
        }}
    >
        <Stack.Screen 
            name='Attendance'
            component={Attendance}
            options={{
                headerTitle: 'Asistencia'
            }}
        />
        <Stack.Screen
            name='Absence'
            component={Absence}
            options={{
                headerTitle: 'Ausencia'
            }}
        />
        <Stack.Screen 
            name='Late'
            component={Late}
            options={{
                headerTitle: 'Tardanza'
            }}
        />
        <Stack.Screen
            name='RemoveAbsence'
            component={RemoveAbsence}
            options={{
                headerTitle: 'Eliminar'
            }}
        />
    </Stack.Navigator>
  )
}

export default AttendanceNavigator