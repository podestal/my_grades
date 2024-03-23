import { StyleSheet, ScrollView } from "react-native"
import ButtonElement from "../utils/Button"
import Input from "../utils/Input"
import { useRef, useState } from "react"
import Title from "../utils/Title"
import { createAssignment } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"
import Calendario from "../utils/Calendario"
import Select from "../utils/Select"
import { useScrollToTop } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native"

const AssignmentForm = ({ route }) => {

    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [competence, setCompetence] = useState('')
    const assignatureId = route?.params?.assignatureId
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const ref = useRef(null)
    const navigator = useNavigation()

    const {mutate: createAssignmentMutation} = useMutation({
        mutationFn: data => createAssignment(data),
        onSuccess: res => {
            setSuccessMsg('Su tarea ha sido creada')
            queryClient.invalidateQueries(['assignments'])
        },
        onError: err => setErrorMsg('Ocurrió un error, vuélvalo a intentar')
    })

    const topScroll = useScrollToTop(
        useRef({
          scrollToTop: () => ref.current?.scrollTo({ y: 100 }),
        })
      );

    const goToTop = () => {

    }

    const handleCreateAssignment = () => {

        setErrorMsg('')
        setSuccessMsg('')
        try {
            createAssignmentMutation({ 
                token: user.access, 
                assignment:{
                    title,
                    due_date: dueDate,
                    competence,
                    assignature: assignatureId,
                } 
            })
            setTitle('')
            setDueDate('')
            setCompetence('')
            navigator.goBack()
        }
        catch {
            console.log('Ocurrió un error')
        }
            
    }

  return (
    <ScrollView ref={ref} style={{backgroundColor: '#fff', flex:1}}>
        <Title 
            text={'Crea una Tarea'}
        />
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        <Input 
            label={'Título de la tarea'}
            value={title}
            setter={setTitle}
        />
        <Calendario 
            setDueDate={setDueDate}
            title={'Fecha de entrega'}
        />
        <Select 
            setCompetence={setCompetence}
            title={'Competencia'}
        />
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        />
    </ScrollView>
  )
}

export default AssignmentForm

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})