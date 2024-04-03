import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TutorMain from '../components/tutor/TutorMain'
import TutorAssignatures from '../components/tutor/TutorAssignatures'
import TutorActivities from '../components/tutor/TutorActivities'

const TutorNavigator = () => {

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
            name='TutorMain'
            component={TutorMain}
            options={{
                headerTitle: 'Alumnos'
            }}
        />
        <Stack.Screen 
            name='TutorAssignatures'
            component={TutorAssignatures}
            options={{
                headerTitle: 'Cursos'
            }}
        />
        <Stack.Screen 
            name='TutorActivities'
            component={TutorActivities}
            options={{
                headerTitle: 'Actvidades'
            }}
        />
    </Stack.Navigator>
  )
}

export default TutorNavigator