import { Text, View, StyleSheet, Button } from "react-native"

const MultiTextSummary = ({ title, items, setShow, setItem, extraSetter, idsSetter, openSetter }) => {
  return (
    <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        {items.map( item => <Text key={item.id} style={styles.text}>{item.title}</Text>)}
        <Button onPress={() => {
            setItem && setItem([])
            extraSetter && extraSetter([])
            idsSetter && idsSetter([])
            openSetter && openSetter(true)
            setShow(true)
        }} title={`Selecciona ${title}`}/>
    </View> 
  )
}

export default MultiTextSummary

const styles = StyleSheet.create({
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    textTitle: {
        fontSize: 24,
        marginVertical: 12,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        marginVertical: 16,
    }

})