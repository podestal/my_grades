import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Assignatures from '../components/grading/Assignatures'
import Activities from '../components/grading/Activities'
import Grades from '../components/grading/Grades'
import ActivityForm from '../components/grading/ActivityForm'
import ObservationForm from '../components/grading/ObservationForm'
import Assignments from '../components/grading/Assignments'
import Participations from '../components/grading/Participations'
import SelectCompsAndCaps from '../components/grading/SelectCompsAndCaps'
import CreateParticipation from '../components/grading/CreateParticipation'

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
        <Stack.Screen 
            name='ActivityCreate'
            component={ActivityForm}
            options={{
                headerTitle: 'Crear'
            }}
        />
        <Stack.Screen 
            name='CreateObservation'
            component={ObservationForm}
            options={{
                headerTitle: 'Observación'
            }}
        />
        <Stack.Screen 
            name='Assignments'
            component={Assignments}
            options={{
                headerTitle: 'Tipos de Actividad'
            }}
        />
        <Stack.Screen 
            name='Participations'
            component={Participations}
            options={{
                headerTitle: 'Participaciones'
            }}
        /> 
        <Stack.Screen 
            name='CreateParticipation'
            component={CreateParticipation}
            options={{
                headerTitle: 'Selecciona'
            }}
        /> 
    </Stack.Navigator>
  )
}

export default GradingNavigator