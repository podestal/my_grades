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
import { useNavigation } from "@react-navigation/native"

const AssignmentForm = ({ route }) => {

    const {competencies} = useCompetencies()
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [competence, setCompetence] = useState('')
    const assignatureId = route?.params?.assignatureId
    const { user } = useAuth()
    const navigator = useNavigation()
    const queryClient = useQueryClient()

    const {mutate: createAssignmentMutation} = useMutation({
        mutationFn: data => createAssignment(data),
        onSuccess: res => {
            console.log(res.data)
            queryClient.invalidateQueries(['assignments'])
        },
        onError: err => console.log(err)
    })

    useEffect(() => {
        console.log('competencies from assignment form', competencies);
    }, [])

    const handleCreateAssignment = () => {
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