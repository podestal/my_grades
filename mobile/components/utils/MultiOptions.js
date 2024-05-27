import { Text, Pressable, StyleSheet, View } from "react-native"
import { useState } from "react"

const MultiOptions = ({ state, item, setter, idsSetter}) => {

    const [pressed, setPressed] = useState(false)

    const handlePress = () => {
        if (pressed) {
            setPressed(false)
            setter(prev => prev.filter( single => single.id != item.id))
            idsSetter(prev => prev.filter(id => id != item.id))
        } else {
            setPressed(true)
            if (state.length > 0) {
                setter( prev => [...prev, item])
                idsSetter( prev => [...prev, item.id])
            } else {
                setter([item])
                idsSetter([item.id])
            }
        }
    }

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <View style={pressed ? styles.pressedInnerContainer : styles.innerContainer}>
                <Text style={pressed ? styles.pressedText : styles.text}>{item.title}</Text>
            </View>
        </Pressable>
    )
}

export default MultiOptions

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