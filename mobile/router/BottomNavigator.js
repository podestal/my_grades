import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Appearance from '../components/school/Appearance'
import CompetenciesNavigator from './CompetenciesNavigator'
import AuthNavigator from './AuthNavigator'
import useAuth from '../hooks/useAuth'
import useCompetencies from '../hooks/useCompetencies'
import { getCompetencies } from '../api/api'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const BottonNavigator = () => {

    const Tab = createBottomTabNavigator()
    const { user } = useAuth()
    const {setCompetencies} = useCompetencies()
    const {data: competencies, isSuccess} = useQuery({
        queryKey: ['competencies'],
        queryFn: () => getCompetencies({ token: user.access })
    })
    useEffect(() => {
        if (isSuccess) {
            setCompetencies(competencies.data)
        }
    }, [])

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
        <Tab.Screen name='Students' component={Appearance} options={{ title: 'Estudiantes' }}/>
        {/* <Tab.Screen name='Assignments' component={Assignatures} options={{ title: 'Cursos' }}/> */}
    </Tab.Navigator>
  )
}

export default BottonNavigator