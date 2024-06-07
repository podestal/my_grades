import { Text, StyleSheet, Pressable, View } from "react-native"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Title from "../utils/Title"
import useAssignatures from "../../hooks/useAssignatures"
import { getAssignaturesByClase } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import List from "../utils/List"
import TutorAssignature from "./TutorAssignature"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native"

const TutorAssignatures = ({ route }) => {

    const student = route?.params?.student
    const claseId = route?.params?.student?.clase?.id
    const navigator = useNavigation()
    // const { assignatures, setAssignatures } = useAssignatures()
    const {user} = useAuth()

    const {data: assignatures, isLoading, isError } = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignaturesByClase({ token: user.access, claseId })
    })

    // const { mutate: getAssignaturesByClaseMutation, isPending, isError } = useMutation({
    //     mutationFn: data => getAssignaturesByClase(data),
    //     onSuccess: res => setAssignatures(res.data),
    //     onError: err => console.log(err)
    // })

    const handlePress = () => {
        navigator.navigate('TutorAttendances', {student})
    }

    // const getter = () => {
    //     getAssignaturesByClaseMutation({ token: user.access, claseId })
    // }

    // useEffect(() => {
    //     if (assignatures.length == 0) {
    //         getter()
    //     }
    // }, [])

    if (isLoading) return <Loading />

    if (isError) return <Error />

  return (
    <NonScrollableContainer>
        <View style={styles.buttonContainer}>
            <Button onPress={handlePress} title="Asistencias"/>
        </View>
        <NonScrollableContainer>
            <List 
                data={assignatures.data}
                DetailComponent={TutorAssignature}
                extraData={student}
            />
        </NonScrollableContainer>
    </NonScrollableContainer>
  )
}

export default TutorAssignatures

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 24,
    },
    pressable: {
        marginHorizontal: 25,
        marginTop: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 200,
        borderRadius: 30,   
    },
    subTitle: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 8,
        fontWeight: 'bold'
    },
})