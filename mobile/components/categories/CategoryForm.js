import { Text } from "react-native"
import Input from "../utils/Input"
import { useState } from "react"
import ButtonElement from "../utils/Button"
import useAuth from "../../hooks/useAuth"

const CategoryForm = ({ create }) => {

    const [title, setTitle] = useState('')
    const [weight, setWeigh] = useState()
    const { user } = useAuth()

    const handleSubmit = () => {
        console.log('created')
        create && create({ token: user.access, category: {
            title: 'mobile',
            weight: (weight/100).toFixed(2)
        }})
    }
  return (
    // label, type, secure, value, setter, placeholder 
    <>
        <Text>Crear Categoría</Text>
        <Input 
            label={'Título'}
            value={title}
            setter={setTitle}
            placeholder={'Título...'}
        />
        <Input 
            label={'Porcentaje'}
            value={weight}
            setter={setWeigh}
            placeholder={'Porcentaje ...'}
            type={'numeric'}
        />
        <ButtonElement 
            title={'Crear'}
            onPress={handleSubmit}
        />
    </>
  )
}

export default CategoryForm