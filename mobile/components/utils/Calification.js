import { useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
const color = {
    'default': '#ecf0f1',
    'NA': 'blue',
    'C': 'orange',
    'B': 'yellow',
    'A': 'green',
    'AD': '',
}

const Calification = ({ calification, currentCalification }) => {

    const [current, setCurrent] = useState(currentCalification)

    const fontColor = currentCalification == 'default' ? '#000' : '#fff'

    const updateCalification = () => {
        console.log(`Calification: ${calification} || Current calification: ${current}`);
        setCurrent(calification)
    }

    const styles = StyleSheet.create({
        gradeContainer: {
            width: 55,
            height: 45,
            textAlign: 'center',
            borderRadius: 20,
            justifyContent: 'center',
            backgroundColor: color[current],
        },
        grade: {
            textAlign: 'center',
            fontSize: 19,
            color: fontColor,
            fontWeight: 'bold'
        }
        
    })

  return (
    <Pressable onPress={updateCalification} style={styles.gradeContainer}>
        <Text style={styles.grade}>{calification}</Text>
    </Pressable>
  )
}

export default Calification
