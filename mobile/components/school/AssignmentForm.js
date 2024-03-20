import { Text } from "react-native"
import useCompetencies from "../../hooks/useCompetencies"
import Container from "../utils/Container"
import ButtonElement from "../utils/Button"
import Input from "../utils/Input"
import { useEffect, useState } from "react"
import Title from "../utils/Title"
import { createAssignment } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"

const AssignmentForm = ({ route }) => {

    const {competencies} = useCompetencies()
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [competence, setCompetence] = useState('')
    const assignatureId = route?.params?.assignatureId
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const {mutate: createAssignmentMutation} = useMutation({
        mutationFn: data => createAssignment(data),
        onSuccess: res => {
            setSuccessMsg('Su tarea ha sido creada')
            queryClient.invalidateQueries(['assignments'])
        },
        onError: err => setErrorMsg('Ocurrió un error, vuélvalo a intentar')
    })

    useEffect(() => {
        console.log('competencies from assignment form', competencies);
    }, [])

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
        }
        catch {
            console.log('Ocurrió un error')
        }
            
    }

  return (
    <Container>
        <Title text={'Crear Assignment'}/>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        <Input 
            label={'Título'}
            value={title}
            setter={setTitle}
        />
        <Input 
            label={'Fecha de entrega'}
            value={dueDate}
            setter={setDueDate}
        />
        <Input 
            label={'Competencia'}
            value={competence}
            setter={setCompetence}
        />
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        />
    </Container>
  )
}

export default AssignmentForm