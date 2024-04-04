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
            <Text>Observaciones</Text>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
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