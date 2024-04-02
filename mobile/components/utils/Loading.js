import { Text, StyleSheet, View } from "react-native"

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando ...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    loadingContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loadingText: {
        fontSize: 28,
    }
})