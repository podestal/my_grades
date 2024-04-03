import Title from "../utils/Title"
import { Pressable, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

const TutorAssignature = ({ data: assignature }) => {

    const navigator = useNavigation()
    const handlePress = () => {
        navigator.navigate('TutorActivities', {assignature})
    }

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
        <Title text={assignature.title}/>
        <Text style={styles.subTitle}>Promedio: C</Text>
    </Pressable>
  )
}

export default TutorAssignature

const styles = StyleSheet.create({
    pressable: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 200,
        borderRadius: 30,   
    },
    subTitle: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 8,
        fontWeight: 'bold'
    },
})