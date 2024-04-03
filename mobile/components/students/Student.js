import { Pressable, Text, StyleSheet } from "react-native"
import useAssignatures from "../../hooks/useAssignatures"
import Title from "../utils/Title"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

const Student = ({ data: student, extraData: showDetails }) => {

    const assignatures = useAssignatures()
    const [showAssignatures, setShowAssignatures] = useState(false)
    const claseId = student?.clase
    const navigator = useNavigation()
    assignatures.assignatures.map(assignature => {
        console.log('From mapping', assignature?.clase.id)
        console.log('claseId', claseId);
    })

    const filteredAssignatures = assignatures.assignatures.filter( assignature => assignature?.clase.id == claseId)

    const handlePress = () => {
        navigator.navigate('Student-Detail', {
            filteredAssignatures,
            student
        })
    }

  return (
    <>  
        <Pressable style={styles.studentContainer} onPress={handlePress}>
            <Text style={styles.studentText}>{student.first_name} {student.last_name}</Text>
            {showDetails && <Text style={styles.studentGrade}>Promedio: AD</Text>}
        </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
    studentContainer: {
        backgroundColor: '#ecf0f1',
        marginBottom: 28,
        borderRadius: 25,
        padding: 14,
    },
    studentText: {
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    studentGrade: {
        textAlign: 'left',
        marginHorizontal: 16,
        marginVertical: 14,
        fontSize: 20,

    }

})

export default Student