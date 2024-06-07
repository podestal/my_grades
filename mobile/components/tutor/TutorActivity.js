import { Text, View, StyleSheet, ScrollView } from "react-native"
import Title from "../utils/Title"

const TutorActivity = ({ data: grade }) => {
  return (
    <View style={styles.container}>
        <View style={styles.activityContainer}>
            <ScrollView>
                <Text style={styles.title}>{grade?.activity?.title}</Text>
            </ScrollView>
            <Text style={styles.calification}>{grade?.calification}</Text>
        </View>
        <View style={{marginVertical: 12}}>
            <Text>Observaciones:</Text>
            <Text>{grade?.observations}</Text>
        </View>
    </View>
  )
}

export default TutorActivity

const styles = StyleSheet.create({
    container: {
        marginVertical: 18,
        marginHorizontal: 18,
    },
    activityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 30,
    },
    calification: {
        fontSize: 32,
        // marginRight: 18,
    }
})