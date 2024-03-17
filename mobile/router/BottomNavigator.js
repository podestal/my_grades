import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Appearance from '../components/school/Appearance'
import Assignatures from '../components/school/Assignatures'
import Main from '../components/school/Main'

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
        <Tab.Screen name='Main' component={Main} options={{ title: 'Inicio' }}/>
        {/* <Tab.Screen name='Appearance' component={Appearance} options={{ title: 'Asistencias' }}/> */}
        <Tab.Screen name='Assignments' component={Assignatures} options={{ title: 'Cursos' }}/>
    </Tab.Navigator>
  )
}

export default BottonNavigator