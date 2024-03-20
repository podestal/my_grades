import { Text, StyleSheet, View, Button } from "react-native"


const Competencie = ({ data: competencie }) => {
  return (
    <View style={styles.competencieContainer}>
      <View>
        <Text style={styles.text}>Título: {competencie.title}</Text>
        <Text style={styles.text}>Valor: {competencie.value * 100}%</Text>
      </View>
      <View>
      <Button title="Editar"/>
      <Button color={'red'} title="Borrar"/>
      </View>
    </View>

  )
}

export default Competencie

const styles = StyleSheet.create({
  competencieContainer: {
    alignItems: 'left',
    marginVertical: 20,
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  }
})