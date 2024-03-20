import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottonNavigator from './BottomNavigator'
import AssignmentForm from '../components/school/AssignmentForm'
import useAuth from '../hooks/useAuth'
import useCompetencies from '../hooks/useCompetencies'
import { getCompetencies } from '../api/api'
import Assignments from '../components/school/Assignments'
import Assignatures from '../components/school/Assignatures'
import Grades from '../components/school/Grades'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const AuthNavigator = () => {

    const { user } = useAuth()
    const {setCompetencies} = useCompetencies()
    const Stack = createNativeStackNavigator()
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
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#000' },
                headerTintColor: '#fff',              
                headerTitleStyle: {
                    fontSize: 25,
                },
                headerShown: false
            }}
        >
            <Stack.Screen 
                name='Assignatures' 
                component={Assignatures} 
            />
            <Stack.Screen 
                name='Assignments' 
                component={Assignments} 
            />
            <Stack.Screen 
                name='Grades' 
                component={Grades} 
            />
            <Stack.Screen 
                name='Create-Assignment'
                component={AssignmentForm}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator