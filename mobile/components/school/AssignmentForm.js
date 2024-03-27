import { StyleSheet, ScrollView, Text } from "react-native"
import ButtonElement from "../utils/Button"
import Input from "../utils/Input"
import { useState } from "react"
import Title from "../utils/Title"
import { createAssignment } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"
import Calendario from "../utils/Calendario"
import Select from "../utils/Select"
import { useNavigation } from "@react-navigation/native"
import { getCompetencies, getCapacities } from "../../api/api"

const AssignmentForm = ({ route }) => {

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('') 
    const [dueDate, setDueDate] = useState('')
    const [dueDateError, setDueDateError] = useState('')
    const [competence, setCompetence] = useState('')
    const [capacity, setCapacity] = useState('')
    const [competenceError, setCompetenceError] = useState('')
    const area = route?.params?.assignature?.area
    const assignatureId = route?.params?.assignature?.id
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const navigator = useNavigation()

    const {mutate: createAssignmentMutation} = useMutation({
        mutationFn: data => createAssignment(data),
        onSuccess: res => {
            setSuccessMsg('Su tarea ha sido creada')
            queryClient.invalidateQueries(['assignments'])
        },
        onError: err => setErrorMsg('Ocurrió un error, vuélvalo a intentar')
    })

    const handleCreateAssignment = () => {

        setErrorMsg('')
        setSuccessMsg('')
        setTitleError('')
        setDueDateError('')
        setCompetenceError('')
        if (title.length == 0) {
            setTitleError('Se necesita un título para la tarea')
            return
        }
        if (dueDate.length == 0) {
            setDueDateError('Porfavor, seleccione una fecha de entrega')
            return
        }
        if (competence.length == 0) {
            setCompetenceError('Porfavor, seleccione una competencia')
            return
        }
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
    <ScrollView style={{backgroundColor: '#fff', flex:1}}>
        <Title 
            text={'Crea una Actividad'}
        />
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {titleError && <ErrorMsg>{titleError}</ErrorMsg>}
        <Input 
            label={'Título de la tarea'}
            value={title}
            setter={setTitle}
        />
        {dueDateError && <ErrorMsg>{dueDateError}</ErrorMsg>}
        <Calendario 
            setDueDate={setDueDate}
            title={'Fecha de entrega'}
        />
        {competenceError && <ErrorMsg>{competenceError}</ErrorMsg>}
        <Select 
            setter={setCompetence}
            title={'Competencia'}
            apiGetter={getCompetencies}
            filter={area}
            keyWord={'competencies'}
        />
        {console.log('competence',competence)}
        {competence > 0 &&
        <Select 
            setter={setCapacity}
            title={'Capacity'}
            apiGetter={getCapacities}
            filter={competence}
            keyWord={'capacities'}
        />
        }
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        />
        {/* {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {titleError && <ErrorMsg>{titleError}</ErrorMsg>}
        <Input 
            label={'Título de la tarea'}
            value={title}
            setter={setTitle}
        />
        {dueDateError && <ErrorMsg>{dueDateError}</ErrorMsg>}
        <Calendario 
            setDueDate={setDueDate}
            title={'Fecha de entrega'}
        />
        {competenceError && <ErrorMsg>{competenceError}</ErrorMsg>}
        <Select 
            setCompetence={setCompetence}
            title={'Competencia'}
        />
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        /> */}
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