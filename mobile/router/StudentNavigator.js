import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Students from '../components/students/Students'
import Clases from '../components/students/Clases'

const StudentNavigator = () => {

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
            name='Students'
            component={Clases}
        />
        {/* <Stack.Screen 
            name='Create-Competencie'
            component={CompetenciesForm}
        /> */}
    </Stack.Navigator>
  )
}

export default StudentNavigator