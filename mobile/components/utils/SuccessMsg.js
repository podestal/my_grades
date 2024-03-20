import { Text, StyleSheet } from "react-native"

const SuccessMsg = ({ children }) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

export default SuccessMsg

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'green',
        marginVertical: 22,
        fontSize: 16,
    }
})