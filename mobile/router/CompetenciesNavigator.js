import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Competencies from '../components/competencies/Competencies'

const CompetenciesNavigator = () => {

    const Stack = createNativeStackNavigator()

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
            name='Competencies'
            component={Competencies}
        />
    </Stack.Navigator>
  )
}

export default CompetenciesNavigator