import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Attendance from '../components/attendance/Attendance'
import Absence from '../components/attendance/Absence'

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
    </Stack.Navigator>
  )
}

export default AttendanceNavigator