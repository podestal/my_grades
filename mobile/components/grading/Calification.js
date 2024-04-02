import { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGrades } from "../../api/api";
import useAuth from "../../hooks/useAuth";

const Calification = ({ data: {calification, grade, currentCalification, setCurrentCalification} }) => {

    // const [currentCalification, setCurrentCalification] = useState(grade?.calification)
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const {mutate: updateGradesMutation } = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            queryClient.invalidateQueries(['assignatures'])
            setCurrentCalification(calification.calification)
        },
        onError: err => console.log(err)
    })

    const handlePress = () => {
        updateGradesMutation({ 
            token: user.access, 
            gradeId: grade.id, 
            calification: { calification: calification.calification } 
        })
    }

  return (
    <Pressable onPress={handlePress} style={calification.calification == currentCalification ? {...styles.calificationContainer, ...styles.calificationContainerActive} : {...styles.calificationContainer }}>
        <Text style={calification.calification == currentCalification ? {...styles.text, ...styles.textActive} : {...styles.text }}>{calification.calification}</Text>
    </Pressable>
  )
}

export default Calification

const styles = StyleSheet.create({
    calificationContainer: {
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#ecf0f1',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calificationContainerActive: {
        backgroundColor: '#4285F4'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textActive: {
        color: '#fff'
    }
})

