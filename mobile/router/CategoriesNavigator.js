import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from '../components/categories/Categories'

const CategoriesNavigator = () => {

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
            name='Categories'
            component={Categories}
            options={{
                headerTitle: 'Categorías'
            }}
        />
    </Stack.Navigator>
  )
}

export default CategoriesNavigator