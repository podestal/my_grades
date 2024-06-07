import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import StudentNavigator from './StudentNavigator'
import AttendanceNavigator from './AttendanceNavigator'
import GradingNavigator from './GradingNavigator'
import TutorNavigator from './TutorNavigator'
import CategoriesNavigator from './CategoriesNavigator'
import useAuth from '../hooks/useAuth'
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottonNavigator = () => {

    const Tab = createBottomTabNavigator()
    const {user} = useAuth() 

  return (
    <>
        {user.profile == 'T' 
        ?
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
            <Tab.Screen name='tutor' component={TutorNavigator} options={{ title: 'Notas' ,
                tabBarIcon: () => (
                    <Ionicons name='stats-chart-outline' size={20} />
            )}}/>   
        </Tab.Navigator>
        :
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
            <Tab.Screen name='grading' component={GradingNavigator} options={{ title: 'Cursos', 
                tabBarIcon: () => (
                    <Ionicons name='document-outline' size={20} />
            )}}/>
            <Tab.Screen name='Student' component={StudentNavigator} options={{ title: 'Estudiantes',
                tabBarIcon: () => (
                    <Ionicons name='people-outline' size={20} />
            )}}/>
            <Tab.Screen name='categories' component={CategoriesNavigator} options={{ title: 'Categorías',
                tabBarIcon: () => (
                    <Ionicons name='analytics-outline' size={20} />
            )}}/>
            {user.profile == 'A' && <Tab.Screen name='attendance' component={AttendanceNavigator} options={{ title: 'Asistencia' ,
                tabBarIcon: () => (
                    <Ionicons name='time-outline' size={20} />
            )}}/>}   
        </Tab.Navigator>
        }
    </>
    // <ion-icon name="people-outline"></ion-icon>
  )
}

export default BottonNavigator