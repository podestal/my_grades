import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottonNavigator from './BottomNavigator'
import Assignments from '../components/school/Assignments'
import Assignatures from '../components/school/Assignatures'

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#000' },
                headerTintColor: '#fff',              
                headerTitleStyle: {
                    fontSize: 25,
                }
                // headerShown: false
            }}
        >
            <Stack.Screen 
                name='Assignatures' 
                component={Assignatures} 
            />
            <Stack.Screen 
                name='Assignments' 
                component={Assignments} 
            />
            <Stack.Screen 
                name='Appearance' 
                component={BottonNavigator} 
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator