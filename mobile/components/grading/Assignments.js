import { Text, Pressable, StyleSheet } from "react-native"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import { useNavigation } from "@react-navigation/native"

const Assignments = ({ route }) => {

    const navigator = useNavigation()
    const assignature = route?.params?.assignature

    const handleActivities = () => {
        navigator.navigate('Activities', {assignature})
    }

    const handleParticipations = () => {
        navigator.navigate('Participations')
    }

  return (
    <NonScrollableContainer>
        <Pressable onPress={handleActivities} style={styles.pressable}>
            <Text style={styles.text}>Actividades</Text>
        </Pressable>
        <Pressable onPress={handleParticipations} style={styles.pressable}>
            <Text  style={styles.text}>Participaciones</Text>
        </Pressable>
    </NonScrollableContainer>
  )
}

export default Assignments

const styles = StyleSheet.create({
    pressable: {
        margin: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 160,
        borderRadius: 30,
    },
    text: {
        fontSize: 30,
    }
})