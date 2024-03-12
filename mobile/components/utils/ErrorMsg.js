import { Text, StyleSheet } from "react-native"

const ErrorMsg = ({ children }) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

export default ErrorMsg


const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'red',
        marginVertical: 22,
        fontSize: 16,
    }
})