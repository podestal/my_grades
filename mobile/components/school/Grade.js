import Title from "../utils/Title"
import { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Calification from "../utils/Calification"
import { updateGrades } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"

const color = {
    'default': '#ecf0f1',
    'NA': 'blue',
    'C': 'orange',
    'B': 'yellow',
    'A': 'green',
    'AD': 'purple',
}

const Grade = ({ data: grade }) => {

    const califications = ['NA', 'C', 'B', 'A', 'AD']
    const [calification, setCalification] = useState(grade?.calification || "default")
    const { user } = useAuth()
    const {mutate: updateGradesMutation} = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            console.log('updated', res.data)
        },
        onError: err => console.log('error', err),
    })


    const updateCalification = (selectedCalification) => {
        try {
            updateGradesMutation({ 
                token: user.access, 
                assignmentId: grade.assignment, 
                gradeId: grade.id, 
                calification: { calification: selectedCalification } })
            setCalification(selectedCalification)
        }

        catch {
            console.log('error')
        }

    }

  return (
    <>
        <Title  text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/>
        <View style={styles.gradesContainer}>
            {califications.map( nota => (
                <Calification 
                    key={nota}
                    calification={nota}
                    currentCalification={calification == nota ? calification : 'default'}
                    updateCalification={updateCalification}
                    color={calification == nota ? color[calification] : '#ecf0f1'}
                />
            ))}
        </View>

    </>
  )
}

export default Grade

const styles = StyleSheet.create({
    gradesContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})