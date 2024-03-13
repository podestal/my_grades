import { Text, StyleSheet , View} from "react-native"

const Title = ({ text }) => {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.title}>
            {text}
        </Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    titleContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 60,
    },
    title: {
        fontSize:35,
    }
})