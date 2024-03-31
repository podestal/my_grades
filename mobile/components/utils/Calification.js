import { useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

const Calification = ({ calification, currentCalification, color, updateCalification }) => {

    const [current, setCurrent] = useState(currentCalification)

    const fontColor = currentCalification == 'default' ? '#000' : '#fff'

    const handlePress = () => {
        console.log('Current calification',calification)
        updateCalification(calification)
    }

    const styles = StyleSheet.create({
        gradeContainer: {
            width: 55,
            height: 45,
            textAlign: 'center',
            borderRadius: 20,
            justifyContent: 'center',
            backgroundColor: color,
        },
        grade: {
            textAlign: 'center',
            fontSize: 19,
            color: fontColor,
            fontWeight: 'bold'
        }
        
    })

  return (
    <Pressable onPress={handlePress} style={styles.gradeContainer}>
        <Text style={styles.grade}>{calification}</Text>
    </Pressable>
  )
}

export default Calification
