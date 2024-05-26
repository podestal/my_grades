import { Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";

const Activity = ({ data:activity }) => {

    const navigator = useNavigation()

    const handlePress = () => {
        navigator.navigate('Grades', {activity})
    }

  return (
    <Pressable style={styles.pressable} onPress={handlePress}>
        <Text style={styles.subTitle}>{activity?.title}</Text>
        {/* <Text style={styles.text}>{activity.competence.title}</Text> */}
        <Text style={{fontSize: 16, fontWeight:'bold'}}>Fecha de Entrega:</Text>
        <Text style={styles.text}>{activity.due_date}</Text>
    </Pressable>
  )
}

export default Activity

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