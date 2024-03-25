import { Text, Pressable, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Title from "../utils/Title";

const Clase = ({ data: assignature }) => {


    const navigator = useNavigation()

    const handlePress = () => {
        navigator.navigate('Students', {claseId: assignature?.clase.id})
    }

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
        {/* <Text>Clase: {assignature.clase.title}</Text> */}
        <Title text={`Clase: ${assignature.clase.title}`}/>
    </Pressable>
  )
}

export default Clase

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
        fontSize: 25
    },
    text: {
        fontSize: 16,
        marginVertical: 6
    }
})