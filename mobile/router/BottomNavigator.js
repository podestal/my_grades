import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CompetenciesNavigator from './CompetenciesNavigator'
import AuthNavigator from './AuthNavigator'
import StudentNavigator from './StudentNavigator'
import AttendanceNavigator from './AttendanceNavigator'
import GradingNavigator from './GradingNavigator'
import useAuth from '../hooks/useAuth'

const BottonNavigator = () => {

    const Tab = createBottomTabNavigator()
    const { user } = useAuth()

  return (
    <Tab.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',              
            headerTitleStyle: {
                fontSize: 25,
            },
            headerShown: false
        }}
    >
        <Tab.Screen name='grading' component={GradingNavigator} options={{ title: 'Cursos'}}/>
        <Tab.Screen name='Student' component={StudentNavigator} options={{ title: 'Estudiantes' }}/>
        <Tab.Screen name='attendance' component={AttendanceNavigator} options={{ title: 'Asistencia' }}/>   
        {/* <Tab.Screen name='assignatures' component={AuthNavigator} options={{ title: 'Cursos' }}/> */}
        {/* <Tab.Screen name='Comptencies' component={CompetenciesNavigator} options={{ title: 'Competencias' }}/> */}

    </Tab.Navigator>
  )
}

export default BottonNavigator