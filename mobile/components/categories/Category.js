import { Text } from "react-native"
import { View } from "react-native"
import { Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Category = ({ data: category }) => {

    const navigator = useNavigation()

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryWeight}>Porcentaje: {Math.round(category.weight * 100)} %</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button 
                title="Editar"
                onPress={() => navigator.navigate('CategoriesUpdate', { category })}
            />
            <Button 
                title="Eliminar"
                color={'red'}
                onPress={() => navigator.navigate('CategoriesDelete', { category })}
            />
        </View>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10
    },
    categoryWeight: {
        fontSize: 20,
        marginVertical: 10
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop: 12,
    },
})