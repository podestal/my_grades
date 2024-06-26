import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Students from '../components/students/Students'
import Clases from '../components/students/Clases'
import StudentDetail from '../components/students/StudentDetail'

const StudentNavigator = () => {

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
            name='Clases'
            component={Clases}
            options={{
                headerTitle: 'Clases'
            }}
        />
        <Stack.Screen 
            name='Students'
            component={Students}
            options={{
                headerTitle: 'Alumnos'
            }}
        />
        <Stack.Screen 
            name='Student-Detail'
            component={StudentDetail}
            options={{
                headerTitle: 'Calificaciones'
            }}
        />
        {/* <Stack.Screen 
            name='Create-Competencie'
            component={CompetenciesForm}
        /> */}
    </Stack.Navigator>
  )
}

export default StudentNavigator