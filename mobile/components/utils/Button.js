import { View, Button, StyleSheet } from "react-native"

const ButtonElement = ({ title, onPress, disable }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
            style={styles.button}
            title={title}
            color={'#fff'}
            onPress={onPress}
            disabled={disable}
        />
      </View>
    </View>
  )
}

export default ButtonElement

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
      marginVertical: 20,
      backgroundColor: '#4285F4',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      width: 150,
  },
  button: {

  }
})