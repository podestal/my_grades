import { useState } from "react"
import { Text, Pressable, StyleSheet, View } from "react-native"

const Competencie = ({ competence, setCompetence}) => {

    const [selected, setSelected] = useState(false)

  return (
    <Pressable style={({ pressed }) => pressed && styles.container} onPress={() => setCompetence(competence)}>
        {/* {selected && console.log('pressed', competence.title)} */}
        <View style={styles.innerContainer}>
            <Text style={styles.text}>{competence.title}</Text>
        </View>
    </Pressable>
  )
}

export default Competencie

const styles = StyleSheet.create({
    container: {
        opacity: 0.75,
    },
    innerContainer: {
        margin: 15,
        padding: 12,
        borderRadius: 30,   
        backgroundColor: 'blue',
    },
    text: {
        overflow: 'hidden',
        color: '#fff',
        fontWeight: 'bold',
    }
})