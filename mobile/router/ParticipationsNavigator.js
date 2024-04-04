import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ParticipationsMain from '../components/participations/ParticipationsMain'

const ParticipationsNavigator = () => {

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
            name='Participations'
            component={ParticipationsMain}
            options={{
                headerTitle: 'Participaciones'
            }}
        />

    </Stack.Navigator>
  )
}

export default ParticipationsNavigator