import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Appearance from '../components/school/Appearance'

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
            }}
        >
            <Stack.Screen 
                name='Appearance' 
                component={Appearance} 
                options={{
                    title: 'Asistencia',
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator