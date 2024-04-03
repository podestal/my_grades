import { Text, StyleSheet, Pressable } from "react-native"
import { useMutation } from "@tanstack/react-query";
import { updateGrades } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import useGrades from "../../hooks/useGrades";

const Calification = ({ data: {calification, grade, currentCalification, setCurrentCalification, setSuccessMsg, setErrorMsg } }) => {

    const { user } = useAuth()
    const { setGrades } = useGrades()

    const {mutate: updateGradesMutation } = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            setCurrentCalification(calification.calification)
            setSuccessMsg('Nota Cambiada')
            setGrades( prev => prev.map( prevGrade => {
                if (prevGrade.id == grade.id) {
                    prevGrade.calification = calification.calification
                }

                return prevGrade
            }))
        },
        onError: err => {
            setErrorMsg('Ocurrió un error, vuélvalo a intentar')
        }
    })

    const handlePress = () => {
        setSuccessMsg('')
        setErrorMsg('')
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

