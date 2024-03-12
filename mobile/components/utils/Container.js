import { View, StyleSheet, ScrollView } from "react-native"

const Container = ({ children }) => {
  return (
    <ScrollView  contentContainerStyle={styles.scrollableContainer}>
      <View style={styles.container}>
          {children}
      </View>
    </ScrollView>
  )
}

export default Container

const styles = StyleSheet.create({
    scrollableContainer: {
      flex: 1,
      justifyContent:'center'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });