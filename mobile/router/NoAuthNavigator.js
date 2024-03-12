import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

const NoAuthNavigator = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Login' 
                component={Login} 
                options={{
                    title: 'Ingresa'
                }}
            />
            <Stack.Screen 
                name='Signup' 
                component={Signup} 
                options={{
                    title: 'Regístrate'
                }}
            />
        </Stack.Navigator>
    )
}

export default NoAuthNavigator