import { Text } from "react-native"
import ButtonElement from "../utils/Button"
import useCategories from "../../hooks/useCategories"
import GetCategories from "../getters/GetCategories"
import { useNavigation } from "@react-navigation/native"


const CreateActivity = ({ assignature }) => {

    const { categories, setCategories } = useCategories()
    const navigator = useNavigation()

  return (
    <>
        {categories.length == 0 
        ? 
        <GetCategories 
            setCategories={setCategories}
        /> 
        : 
        <ButtonElement 
            title={'Crear'}
            onPress={() => navigator.navigate('ActivityCreate', {
                assignature,
            })}
        /> 
        }
    </>
  )
}

export default CreateActivity