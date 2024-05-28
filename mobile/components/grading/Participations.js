import { Button, TextInput, StyleSheet, View } from "react-native"
import useStudents from "../../hooks/useStudents"
import { getStudents } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import List from "../utils/List"
import Student from "./Student"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import { useNavigation } from "@react-navigation/native"

// getStudents({ token: user.access, claseId })

const Participations = ({ route }) => {

    const assignature = route?.params?.assignature
    const navigator = useNavigation()
    const claseId = route?.params?.assignature?.clase?.id
    const [ name, setName] = useState('')
    const { user } = useAuth()
    const { students, setStudents } = useStudents()
    const filteredStudents = students?.filter( student => student.clase = claseId) || []
    const { mutate: getStudentsMutation, isPending, isError } = useMutation({
        mutationFn: data => getStudents(data),
        onSuccess: res => setStudents( prev => ([ ...prev, ...res.data ])),
        onError: err => console.log(err)
    })

    const getter = () => {
        getStudentsMutation({ token: user.access, claseId })
    }

    useEffect(() => {
        if (filteredStudents.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

  return (
    <NonScrollableContainer>
        <View style={styles.inputButtonContainer}>
            <TextInput  
                style={styles.input}
                value={name}
                onChangeText={ inputValue => setName(inputValue)}
                placeholder={'Buscar alumno ...'}
            />
            <Button 
                title="Competencias y capacidades"
                onPress={() => navigator.navigate('CompsAndCaps', { assignature })}
            />
        </View>
        <NonScrollableContainer>
            <List 
                data={students
                    ?.filter( student => student.clase = claseId)
                    ?.filter( student => (
                        `${student?.first_name} ${student?.last_name}`
                        .toLocaleLowerCase()
                        .includes(name.toLocaleLowerCase())
                    ))
                }
                DetailComponent={Student}
                extraData={{assignature}}
            />
        </NonScrollableContainer>
    </NonScrollableContainer>
  )
}

export default Participations

const styles = StyleSheet.create({
    inputButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: 10,
    },
    input: {
        backgroundColor: '#ecf0f1',
        borderRadius: 20,
        width: 200,
        padding: 8,
        marginTop: 12,
        textAlign: 'center'
    }
})