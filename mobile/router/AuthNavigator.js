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
            />
            <Stack.Screen 
                name='Assignments' 
                component={Assignments} 
            />
            <Stack.Screen 
                name='Grades' 
                component={Grades} 
            />
            <Stack.Screen 
                name='Create-Assignment'
                component={AssignmentForm}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator