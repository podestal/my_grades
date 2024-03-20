import Title from "../utils/Title"
import Input from "../utils/Input"
import ButtonElement from "../utils/Button"
import { useState } from "react"
import Container from "../utils/Container"
import { createCompetencie } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import useCompetencies from "../../hooks/useCompetencies"

const CompetenciesForm = () => {

    const [title, setTitle] = useState('')
    const [percent, setPercent] = useState('')
    const { user } = useAuth()
    const { setCompetencies } = useCompetencies()
    const {mutate: createCompetencieMutation} = useMutation({
        mutationFn: data => createCompetencie(data),
        onSuccess: res => console.log('competencie created', res),
        onError: err => console.log(err)
    })

    const handleCreateCompetencie = () => {
        try {
            value = (parseInt(percent) / 100).toFixed(2)
            createCompetencieMutation({ 
                token: user.access,  
                competencie: {
                    title,
                    value
                }
            })
        } catch {
            console.log('error')
        }
    }

  return (
    <Container>
        <Title text={'Crear Competencia'}/>
        <Input 
            label={'Título'}
            value={title}
            setter={setTitle}
        />  
        <Input 
            label={'Porcentaje'}
            value={percent}
            setter={setPercent}
        />      
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateCompetencie}
        />
    </Container>
  )
}

export default CompetenciesForm