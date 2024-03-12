import { View, StyleSheet, ScrollView } from "react-native"
import Title from "./Title"

const Container = ({ children, title }) => {
  return (
    <ScrollView  contentContainerStyle={styles.scrollableContainer}>
      <View style={styles.container}>
          {title && <Title text={title}/>}
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