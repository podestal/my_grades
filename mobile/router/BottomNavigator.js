import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CompetenciesNavigator from './CompetenciesNavigator'
import AuthNavigator from './AuthNavigator'
import useAuth from '../hooks/useAuth'
import StudentNavigator from './StudentNavigator'
import { getAssignatures } from '../api/api'
import { useQuery } from '@tanstack/react-query'
import useAssignatures from '../hooks/useAssignatures'

const BottonNavigator = () => {

    const Tab = createBottomTabNavigator()
    const { user, setUser } = useAuth()
    const { setAssignatures } = useAssignatures()
    const {data: assignatures, isSuccess} = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignatures({ token: user.access })
    })

    if (isSuccess) {
        setAssignatures(assignatures.data)
    }

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