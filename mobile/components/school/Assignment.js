import { Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Assignment = ({ data: activity }) => {

    const navigator = useNavigation()


    const handlePress = () => {
        navigator.navigate('Grades', {
            activityId: activity.id
        })
    }

  return (
    <Pressable style={styles.pressable} onPress={handlePress}>
        <Text style={styles.subTitle}>{activity.title}</Text>
        <Text style={styles.text}>{activity.competence.title}</Text>
        <Text style={styles.text}>{activity.created_at}</Text>
        <Text style={styles.text}>{activity.due_date}</Text>
    </Pressable>
  )
}

export default Assignment

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