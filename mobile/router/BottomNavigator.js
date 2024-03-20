import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Appearance from '../components/school/Appearance'
import Assignatures from '../components/school/Assignatures'
import CompetenciesNavigator from './CompetenciesNavigator'
import Main from '../components/school/Main'
import AuthNavigator from './AuthNavigator'

const BottonNavigator = () => {

    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',              
            headerTitleStyle: {
                fontSize: 25,
            }
        }}
    >   
        <Tab.Screen name='Assignatures' component={AuthNavigator} options={{ title: 'Cursos' }}/>
        <Tab.Screen name='Comptencies' component={CompetenciesNavigator} options={{ title: 'Competencias' }}/>
        <Tab.Screen name='Appearance' component={Appearance} options={{ title: 'Asistencias' }}/>
        {/* <Tab.Screen name='Assignments' component={Assignatures} options={{ title: 'Cursos' }}/> */}
    </Tab.Navigator>
  )
}

export default BottonNavigator