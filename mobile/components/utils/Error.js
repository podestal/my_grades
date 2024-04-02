import { View, Text, StyleSheet, Button } from "react-native"

const Error = ({ retry }) => {

    const handleRetry = () => {
        console.log('Retrying')
        retry()
    }

  return (
    <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lo sentimos, ocurrió un error en la red</Text>
        <Button onPress={handleRetry} title="Volver a intentar"/>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({
    errorContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    errorText: {
        fontSize: 28,
        marginBottom: 32,
        lineHeight: 50,
        textAlign: 'center'
    }
})