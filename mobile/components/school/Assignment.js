import { useEffect, useState } from "react"
import { Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Assignment = ({ data: assignment }) => {

    const navigator = useNavigation()

    useEffect(() => {
        console.log('assignment:', assignment);
    }, [])


    const handlePress = () => {
        navigator.navigate('Grades', {
            assignmentId: assignment.id
        })
    }

  return (
    <Pressable style={styles.pressable} onPress={handlePress}>
        <Text style={styles.subTitle}>{assignment.title}</Text>
        <Text style={styles.text}>{assignment.competence.title}</Text>
        <Text style={styles.text}>{assignment.created_at}</Text>
        <Text style={styles.text}>{assignment.due_date}</Text>
    </Pressable>
  )
}

export default Assignment

const styles = StyleSheet.create({
    pressable: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 200,
        borderRadius: 30,   
    },
    subTitle: {
        fontSize: 25
    },
    text: {
        fontSize: 16,
        marginVertical: 6
    }
})