import { Text, StyleSheet, View } from "react-native"
import useCompetencies from "../../hooks/useCompetencies"
import List from "../utils/List"
import Title from "../utils/Title"
import Competencie from "./Competencie"
import ButtonElement from "../utils/Button"
import { useNavigation } from "@react-navigation/native"
import { useQuery } from "@tanstack/react-query"
import { getCompetencies } from "../../api/api"
import useAuth from "../../hooks/useAuth"


const Competencies = () => {

    const navigator = useNavigation()
    let totalValue = 0
    const { user } = useAuth()

    const {data: competencies, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['competencies'],
        queryFn: () => getCompetencies({ token: user.access })
    })

    if (isLoading) return <Text>Cargando ...</Text>

    if (isError) return <Text>Error</Text>

    if (isSuccess) {
        totalValue = competencies.data.reduce((sum, competencie) => {
            return sum + competencie.value}, 0)
    }

  return (
    <View style={styles.container}>
        <ButtonElement 
            title={'Crear'}
            onPress={() => navigator.navigate('Create-Competencie')}
        />
        <Title text={`Valor total: ${(totalValue*100).toFixed(0)}%`}/>
        <List 
            data={competencies.data}
            DetailComponent={Competencie}
            style={{marginBottom: 120}}
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