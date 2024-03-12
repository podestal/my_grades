import { View, Button, StyleSheet } from "react-native"

const ButtonElement = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
        <Button 
            style={styles.button}
            title={title}
            color={'#fff'}
            onPress={onPress}
        />
    </View>
  )
}

export default ButtonElement

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 20,
        backgroundColor: '#4285F4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    button: {

    }
})