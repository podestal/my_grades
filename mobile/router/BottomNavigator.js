import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CompetenciesNavigator from './CompetenciesNavigator'
import AuthNavigator from './AuthNavigator'
import StudentNavigator from './StudentNavigator'

const BottonNavigator = () => {

    const Tab = createBottomTabNavigator()


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
        <Tab.Screen name='AssignaturesBottom' component={AuthNavigator} options={{ title: 'Cursos' }}/>
        <Tab.Screen name='Comptencies' component={CompetenciesNavigator} options={{ title: 'Competencias' }}/>
        <Tab.Screen name='Student' component={StudentNavigator} options={{ title: 'Estudiantes' }}/>
    </Tab.Navigator>
  )
}

export default BottonNavigator