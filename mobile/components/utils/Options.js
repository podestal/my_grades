import { Text, Pressable, StyleSheet, View } from "react-native"

const Options = ({ item, setter}) => {
  return (
    <Pressable style={({ pressed }) => pressed && styles.container} onPress={() => setter(item)}>
        <View style={styles.innerContainer}>
            <Text style={styles.text}>{item.title}</Text>
        </View>
    </Pressable>
  )
}

export default Options

const styles = StyleSheet.create({
    container: {
        opacity: 0.75,
    },
    innerContainer: {
        margin: 15,
        padding: 12,
        borderRadius: 30,   
        backgroundColor: 'blue',
    },
    text: {
        overflow: 'hidden',
        color: '#fff',
        fontWeight: 'bold',
    }
})