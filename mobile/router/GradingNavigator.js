import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Assignatures from '../components/grading/Assignatures'

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
            name='Cursos'
            component={Assignatures}
        />
    </Stack.Navigator>
  )
}

export default GradingNavigator