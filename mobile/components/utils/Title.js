import { Text, StyleSheet , View} from "react-native"

const Title = ({ children }) => {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.title}>
            {children}
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
        marginTop: 60,
    },
    title: {
        fontSize:35,
    }
})