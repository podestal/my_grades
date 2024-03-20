import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Competencies from '../components/competencies/Competencies'
import CompetenciesForm from '../components/competencies/CompetenciesForm'

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
        }}
    >
        <Stack.Screen 
            name='Competencies'
            component={Competencies}
        />
        <Stack.Screen 
            name='Create-Competencie'
            component={CompetenciesForm}
        />
    </Stack.Navigator>
  )
}

export default CompetenciesNavigator