import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Appearance from '../components/school/Appearance'
import BottonNavigator from './BottomNavigator'

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                // headerStyle: { backgroundColor: '#000' },
                // headerTintColor: '#fff',              
                // headerTitleStyle: {
                //     fontSize: 25,
                // }
                headerShown: false
            }}
        >
            <Stack.Screen 
                name='Appearance' 
                component={BottonNavigator} 
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator