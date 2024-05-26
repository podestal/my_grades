import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from '../components/categories/Categories'
import CategoryForm from '../components/categories/CategoryForm'

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
        <Stack.Screen 
            name='CategoriesCreate'
            component={CategoryForm}
            options={{
                headerTitle: 'Crear categoría'
            }}
        />
    </Stack.Navigator>
  )
}

export default CategoriesNavigator