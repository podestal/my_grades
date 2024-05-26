import { Text } from "react-native"
import Input from "../utils/Input"
import { useState } from "react"
import ButtonElement from "../utils/Button"
import useAuth from "../../hooks/useAuth"
import SuccessMsg from "../utils/SuccessMsg"
import ErrorMsg from "../utils/ErrorMsg"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const CategoryForm = ({ create, disable, error, success }) => {

    const [title, setTitle] = useState('')
    const [weight, setWeigh] = useState()
    const { user } = useAuth()

    // VALIDATORS
    const [titleValidator, setTitleValidator] = useState(false)
    const [titleValidatorMsg, setTitleValidatorMsg] = useState('')

    const [weighValidator, setWeighValidator] = useState(false)
    const [weightValidatorMsg, setWeightValidatorMsg] = useState('')

    const handleSubmit = () => {

        setTitleValidator(false)
        setTitleValidatorMsg('')
        setWeighValidator(false)
        setWeightValidatorMsg('')

        if (title.length == 0) {
            setTitleValidator(true)
            setTitleValidatorMsg('El título de la categoría es obligatorio')
            return
        }

        if (weight <= 0 || !weight) {
            setWeighValidator(true)
            setWeightValidatorMsg('El procentaje debe de ser mayor a 0')
            return
        }
        console.log('created')
        create && create({ token: user.access, category: {
            title,
            weight: (weight/100).toFixed(2)
        }})
    }
  return (
    // label, type, secure, value, setter, placeholder 
    <NonScrollableContainer>
        {success && <SuccessMsg>Categoría creada</SuccessMsg>}
        {error && <ErrorMsg>Ocurrió un problema, vuélvalo a intentar más tarde</ErrorMsg>}
        <Input 
            label={'Título'}
            value={title}
            setter={setTitle}
            placeholder={'Título...'}
            error={titleValidator}
            errorMsg={titleValidatorMsg}
        />
        <Input 
            label={'Porcentaje'}
            value={weight}
            setter={setWeigh}
            placeholder={'Porcentaje ...'}
            type={'numeric'}
            error={weighValidator}
            errorMsg={weightValidatorMsg}
        />
        <ButtonElement 
            title={'Crear'}
            onPress={handleSubmit}
            disable={disable}
        />
    </NonScrollableContainer>
  )
}

export default CategoryForm