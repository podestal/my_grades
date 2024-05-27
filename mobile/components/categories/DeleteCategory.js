import { Text, StyleSheet, ScrollView, View, Button } from "react-native"
import Title from "../utils/Title"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "../../api/api"
import SuccessMsg from "../utils/SuccessMsg"
import Error from "../utils/Error"
import useAuth from "../../hooks/useAuth"

const DeleteCategory = ({ route }) => {

    const category = route?.params?.category
    const navigator = useNavigation()
    const queryClient = useQueryClient()
    const { user } = useAuth()


    const [confirmRemove, setConfirmRemove] = useState(false)
    const [showButtons, setShowButtons] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const { mutate: deleteCategoryMutation } = useMutation({
        mutationFn: data => deleteCategory(data),
        onSuccess: res => {
            console.log(res.data)
            queryClient.invalidateQueries(['categories'])
            setShowButtons(false)
            setSuccess(true)
            setError(false)
        },
        onError: err => {
            console.log(err)
            setError(true)
            setSuccess(false)
        }
    })

    const handleDelete = () => {
        setSuccess(false)
        setError(false)
        deleteCategoryMutation({ token: user.access, categoryId: category.id })
    }

  return (
    <ScrollView style={{flex: 1}}>
        {success && <SuccessMsg>Categoría eliminada</SuccessMsg>}
        {error && <Error>No se pudo eliminar su categoría, vuélvalo a intentar más tarde</Error>}
        <Title 
            text={'Eliminar'}
        />
        <View style={styles.textContainer}>
            <Text style={styles.text}>Título:</Text>
            <Text style={styles.subTitle}>{category?.title}</Text>
            <Text style={styles.text}>Porcentaje:</Text>
            <Text style={styles.subTitle}>{Math.round(category.weight * 100)}%</Text>
        </View>
        {showButtons &&         
            <View style={styles.buttonContainer}>
                {!confirmRemove ? <Button onPress={() => setConfirmRemove(true) } color={'#c0392b'} title="Eliminar"/> :<Button onPress={handleDelete} color={'#c0392b'} title="Confirmar"/>}
                {/* <Button onPress={handleDelete} color={'#c0392b'} title="Eliminar"/> */}
                <Button onPress={() => navigator.goBack()} title="Cancelar"/>
            </View>
        }
    </ScrollView>
  )
}

export default DeleteCategory

const styles = StyleSheet.create({
    textContainer: {
        marginVertical: 12,  
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitle: {
        fontSize: 28,
        marginVertical: 15,
    },
    text: {
        fontSize: 20,
        marginVertical: 12,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 48,  
        marginBottom: 20,
    }
})