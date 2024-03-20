import { Text, StyleSheet, View } from "react-native"
import useCompetencies from "../../hooks/useCompetencies"
import List from "../utils/List"
import Title from "../utils/Title"
import Competencie from "./Competencie"
import ButtonElement from "../utils/Button"
import { useNavigation } from "@react-navigation/native"

const Competencies = () => {

    const { competencies } = useCompetencies()
    const navigator = useNavigation()
    const totalValue = competencies.reduce((sum, competencie) => {
        return sum + competencie.value}, 0)

  return (
    <View style={styles.container}>
        <ButtonElement 
            title={'Crear'}
            onPress={() => navigator.navigate('Create-Competencie')}
        />
        <Title text={`Total Value: ${totalValue*100}%`}/>
        <List 
            data={competencies}
            DetailComponent={Competencie}
        />
    </View>
  )
}

export default Competencies

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: 60,
        height: '100%'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})