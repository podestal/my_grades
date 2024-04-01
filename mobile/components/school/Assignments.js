import { StyleSheet, Text, View, Button } from "react-native"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getActivities, getGradesByAssignature } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import Assignment from "./Assignment"
import List from "../utils/List"
import ButtonElement from "../utils/Button"
import { useNavigation } from "@react-navigation/native"
import useGrades from "../../hooks/useGrades"
import { useEffect } from "react"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const Assignments = ({ route }) => {

    const assignatureId = route.params.assignatureId
    const assignature = route.params.assignature
    const {user} = useAuth()
    const navigator = useNavigation()
    const {grades, setGrades}= useGrades()

    const { mutate: getGradesMutation } = useMutation({
        mutationFn: data => getGradesByAssignature(data),
        onSuccess: res => setGrades( prev => ([ ...prev, ...res.data ]))
    })

    useEffect(() => {

        if (grades.length == 0) {
            console.log('Getting grades ')
            getGradesMutation({ token: user.access, assignatureId })
         } else {
            const filteredGrades = grades.filter( grade => grade.assignature == assignatureId)
            console.log('filteredGrades for assignment',filteredGrades)
            filteredGrades.length > 0 ? console.log('Let api alone') : getGradesMutation({ token: user.access, assignatureId })
        
        }
    }, [])

    const {data: activities, isLoading, isError, error} = useQuery({
        queryKey: ['assignments'],
        queryFn: () => getActivities({token: user.access, assignature:assignatureId}),
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <NonScrollableContainer>
        <ButtonElement 
            title={'Crear'}
            onPress={() => navigator.navigate('Create-Assignment', {
                assignatureId,
                assignature
            })}
        />
        {activities && 
            <NonScrollableContainer> 
                <List 
                    data={activities.data}
                    DetailComponent={Assignment}
                    style={{marginBottom: 50}}
                />
            </NonScrollableContainer>
        }
    </NonScrollableContainer>
  )
}

export default Assignments


