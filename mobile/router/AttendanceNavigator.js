import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Attendance from '../components/attendance/Attendance'
import Absence from '../components/attendance/Absence'
import Late from '../components/attendance/Late'

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
        />
        <Stack.Screen
            name='Absence'
            component={Absence}
        />
        <Stack.Screen 
            name='Late'
            component={Late}
        />
    </Stack.Navigator>
  )
}

export default AttendanceNavigator