import { Text, StyleSheet, Pressable } from "react-native"
import Title from "../utils/Title"

const Assignature = ({ assignature }) => {

    const level = assignature?.clase?.level == 'P' ? 'Primaria' : 'Secundaria'

    const handlePress = () => {
        console.log(`${assignature.title} pressed`);
    }

    return (
        <Pressable style={styles.pressable} onPress={handlePress}>
            {console.log(assignature)}
            <Title text={assignature.title}/>
            <Text  style={styles.text} >Clase: {assignature.clase.title}</Text>
            <Text style={styles.text}>Nivel: {level}</Text>
        </Pressable>
    )

}

export default Assignature

const styles = StyleSheet.create({
    pressable: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 200,
        borderRadius: 30,
    },
    text: {
        fontSize: 16
    }
})