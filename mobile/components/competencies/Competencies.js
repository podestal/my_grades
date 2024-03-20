import { Text } from "react-native"
import useCompetencies from "../../hooks/useCompetencies"
import List from "../utils/List"
import Title from "../utils/Title"
import Competencie from "./Competencie"
import ButtonElement from "../utils/Button"
import { useNavigation } from "@react-navigation/native"

const Competencies = () => {

    const { competencies } = useCompetencies()
    const navigator = useNavigation()

  return (
    <>
        <ButtonElement 
            title={'Crear'}
            onPress={() => navigator.navigate('Create-Competencie')}
        />
        <List 
            data={competencies}
            DetailComponent={Competencie}
        />
    </>
  )
}

export default Competencies