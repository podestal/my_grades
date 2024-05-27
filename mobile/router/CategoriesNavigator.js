import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from '../components/categories/Categories'
import UpdateCategory from '../components/categories/UpdateCategory'
import CreateCategory from '../components/categories/CreateCategory'
import DeleteCategory from '../components/categories/DeleteCategory'

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
            component={CreateCategory}
            options={{
                headerTitle: 'Crear categoría'
            }}
        />
        <Stack.Screen 
            name='CategoriesUpdate'
            component={UpdateCategory}
            options={{
                headerTitle: 'Editar categoría'
            }}
        />
        <Stack.Screen 
            name='CategoriesDelete'
            component={DeleteCategory}
            options={{
                headerTitle: 'Eliminar categoría'
            }}
        />
    </Stack.Navigator>
  )
}

export default CategoriesNavigator