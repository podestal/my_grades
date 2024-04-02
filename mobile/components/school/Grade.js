import Title from "../utils/Title"
import { useEffect, useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Calification from "../utils/Calification"
import { updateGrades } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import useGrades from "../../hooks/useGrades"

const colors = {
    'default': '#ecf0f1',
    'NA': 'blue',
    'C': 'orange',
    'B': 'yellow',
    'A': 'green',
    'AD': 'purple',
}

const Grade = ({ data: grade }) => {

    const califications = ['NA', 'C', 'B', 'A', 'AD']
    const queryClient = useQueryClient()
    const [updatedGrade, setUpdatedGrade] = useState(grade)
    const [calification, setCalification] = useState(grade?.calification || "default")
    const [currentCalification, setCurrentCalification] = useState(grade?.calification)
    const { user, setUser } = useAuth()
    const color = colors[calification]
    const {grades, setGrades} = useGrades()
    const {mutate: updateGradesMutation} = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            queryClient.invalidateQueries([`grades`])
            const updatedGrades = grades.map( currentGrade => {
                if (currentGrade.id == grade.id){
                    currentGrade.califiaction = currentCalification
                }
                return currentGrade
            })
            setGrades(updatedGrades)
            setUpdatedGrade(updatedGrade)

        },
        onError: err => console.log('error', err),
    }) 

    const updateCalification = (selectedCalification) => {
        try {
            updateGradesMutation({ 
                token: user.access, 
                gradeId: updatedGrade.id, 
                calification: { calification: selectedCalification } })
            setCalification(selectedCalification)
            const myUpdatedGrade = grades.filter( currentGrade => currentGrade.id == 10)
        }

        catch {
            console.log('error')
        }

    }

  return (
    <>  
        {/* {console.log('calification', calification)} */}
        <Title  text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/>
        <Text>Calification {currentCalification}</Text>
        {/* {console.log('Grade:', grade?.calification)} */}
        <View style={styles.gradesContainer}>
            {califications.map( nota => (
                <Calification 
                    key={nota}
                    calification={nota}
                    currentCalification={calification == nota ? calification : 'default'}
                    updateCalification={updateCalification}
                    color={color}
                    setCurrentCalification={setCurrentCalification}
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