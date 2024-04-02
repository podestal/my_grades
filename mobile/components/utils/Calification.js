import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

const Calification = ({ calification, color, currentCalification, updateCalification, setCurrentCalification }) => {

    const colors = {
        'default': '#ecf0f1',
        'NA': 'blue',
        'C': 'orange',
        'B': 'yellow',
        'A': 'green',
        'AD': 'purple',
    }
    const [currentColor, setCurrentColor] = useState(colors[currentCalification])

    const fontColor = currentCalification == 'default' ? '#000' : '#fff'

    useEffect(() => {
        // console.log('Calification changed')
        // console.log('current calification', currentCalification);
        setCurrentColor(colors[currentCalification])
        // console.log('current color changed', currentColor)
    }, [currentCalification])

    const handlePress = () => {
        // console.log('Current calification',calification)
        updateCalification(calification)
        setCurrentCalification(calification)
    }

    const styles = StyleSheet.create({
        gradeContainer: {
            width: 55,
            height: 45,
            textAlign: 'center',
            borderRadius: 20,
            justifyContent: 'center',
            backgroundColor: currentColor,
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
