import { View, StyleSheet } from "react-native"

const NonScrollableContainer = ({ children }) => {
  return (
    <View style={styles.container}> 
        {children}
    </View>
  )
}

export default NonScrollableContainer

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1
    }
  })