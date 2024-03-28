import { Text, View, StyleSheet, Button } from "react-native"

const TextSummary = ({ title, item, setItem, extraSetter }) => {
  return (
    <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.text}>{item}</Text>
        <Button onPress={() => {
            setItem()
            extraSetter && extraSetter()}} title={`Selecciona ${title}`}/>
    </View> 
  )
}

export default TextSummary

const styles = StyleSheet.create({
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    textTitle: {
        fontSize: 22,
        marginVertical: 12,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 16,
    }

})