import { View, Text, TextInput, StyleSheet } from "react-native"
import ErrorMsg from "./ErrorMsg"

const Input = ({ label, type, secure, value, setter, placeholder, error, errorMsg, multiline }) => {
  return (
    <View style={styles.container}>
        {error && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <Text style={styles.label}>{label}</Text>
        <TextInput  
            style={styles.input}
            keyboardType={type ? type : 'default'}
            secureTextEntry={secure}
            value={value}
            onChangeText={ inputValue => setter(inputValue)}
            autoCapitalize='none'
            placeholder={placeholder}
            multiline={multiline}
        />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    label: {
        fontSize: 16,
    },
    input: {
        backgroundColor: '#ecf0f1',
        borderRadius: 20,
        width: 240,
        padding: 8,
        marginVertical: 12,
        textAlign: 'center'
    }
})