import { View, Text, TextInput, StyleSheet } from "react-native"

const Input = ({ label, type, secure, value, setter, placeholder }) => {
  return (
    <View style={styles.container}>
        {/* <Text style={styles.label}>{label}</Text> */}
        <TextInput  
            style={styles.input}
            keyboardType={type ? type : 'default'}
            secureTextEntry={secure}
            value={value}
            onChangeText={ inputValue => setter(inputValue)}
            autoCapitalize='none'
            placeholder={placeholder}
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
        marginTop: 12,
    },
    label: {
        fontSize: 16,
    },
    input: {
        backgroundColor: '#ecf0f1',
        borderRadius: 20,
        width: 240,
        padding: 8,
        marginTop: 12,
        textAlign: 'center'
    }
})