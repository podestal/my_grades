import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Assignatures from '../components/grading/Assignatures'
import Activities from '../components/grading/Activities'
import Grades from '../components/grading/Grades'

const GradingNavigator = () => {

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
            name='Activities'
            component={Activities}
            options={{
                headerTitle: 'Actividades'
            }}
        />
        <Stack.Screen 
            name='Grades'
            component={Grades}
            options={{
                headerTitle: 'Notas'
            }}
        />
    </Stack.Navigator>
  )
}

export default GradingNavigator