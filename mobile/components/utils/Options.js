import { Text, Pressable, StyleSheet, View } from "react-native"
import { useState } from "react"

const Options = ({ item, setter}) => {

    const [pressed, setPressed] = useState(false)

  return (
    <Pressable onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} style={styles.container} onPress={() => setter(item)}>
        <View style={pressed ? styles.pressedInnerContainer : styles.innerContainer}>
            <Text style={pressed ? styles.pressedText : styles.text}>{item.title}</Text>
        </View>
    </Pressable>
  )
}

export default Options

const styles = StyleSheet.create({
    container: {
        // opacity: 0.75,
    },
    innerContainer: {
        margin: 15,
        padding: 12,
        borderRadius: 30,   
        backgroundColor: '#ecf0f1',
    },
    pressedInnerContainer: {
        margin: 15,
        padding: 12,
        borderRadius: 30,   
        backgroundColor: '#4285F4',
    },
    text: {
        color: '#000',
    },
    pressedText: {
        fontWeight: 'bold',
        color: '#fff',
    }
})