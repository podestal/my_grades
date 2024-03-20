import { Text } from "react-native"
import useCompetencies from "../../hooks/useCompetencies"
import Container from "../utils/Container"
import ButtonElement from "../utils/Button"
import Input from "../utils/Input"
import { useEffect, useState } from "react"

const AssignmentForm = () => {

    const {competencies} = useCompetencies()
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [competence, setCompetence] = useState('')

    useEffect(() => {
        console.log('competencies from assignment form', competencies);
    }, [])

  return (
    <Container>
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
        />
    </Container>
  )
}

export default AssignmentForm