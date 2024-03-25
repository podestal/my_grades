import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AssignmentForm from '../components/school/AssignmentForm'
import Assignments from '../components/school/Assignments'
import Assignatures from '../components/school/Assignatures'
import Grades from '../components/school/Grades'

const AuthNavigator = () => {

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
                name='Assignatures' 
                component={Assignatures} 
                options={{
                    headerTitle: 'Cursos'
                }}
            />
            <Stack.Screen 
                name='Assignments' 
                component={Assignments} 
                options={{
                    headerTitle: 'Tareas'
                }}
            />
            <Stack.Screen 
                name='Grades' 
                component={Grades} 
                options={{
                    headerTitle: 'Notas'
                }}
            />
            <Stack.Screen 
                name='Create-Assignment'
                component={AssignmentForm}
                options={{
                    headerTitle: 'Crear'
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator