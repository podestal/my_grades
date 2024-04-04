import { Text, StyleSheet, Pressable } from "react-native"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Title from "../utils/Title"
import useAssignatures from "../../hooks/useAssignatures"
import { getAssignaturesByClase } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import List from "../utils/List"
import TutorAssignature from "./TutorAssignature"

const TutorAssignatures = ({ route }) => {

    const student = route?.params?.student
    const claseId = route?.params?.student?.clase?.id
    const { assignatures, setAssignatures } = useAssignatures()
    const {user} = useAuth()

    const { mutate: getAssignaturesByClaseMutation, isPending, isError } = useMutation({
        mutationFn: data => getAssignaturesByClase(data),
        onSuccess: res => setAssignatures(res.data),
        onError: err => console.log(err)
    })

    const getter = () => {
        getAssignaturesByClaseMutation({ token: user.access, claseId })
    }

    useEffect(() => {
        if (assignatures.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

  return (
    <NonScrollableContainer>
        <Pressable style={styles.pressable}>
            <Title text={'Asistencias'}/>
        </Pressable>
        <List 
            data={assignatures}
            DetailComponent={TutorAssignature}
            extraData={student}
        />
    </NonScrollableContainer>
  )
}

export default TutorAssignatures

const styles = StyleSheet.create({
    pressable: {
        // marginVertical: 15,
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