import Title from "../utils/Title"
import Input from "../utils/Input"
import ButtonElement from "../utils/Button"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Container from "../utils/Container"
import { createCompetencie } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import useCompetencies from "../../hooks/useCompetencies"
import SuccessMsg from "../utils/SuccessMsg"
import ErrorMsg from "../utils/ErrorMsg"

const CompetenciesForm = () => {

    const [title, setTitle] = useState('')
    const [percent, setPercent] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const { user } = useAuth()
    const { competencies, setCompetencies } = useCompetencies()
    const navigator = useNavigation()
    const {mutate: createCompetencieMutation} = useMutation({
        mutationFn: data => createCompetencie(data),
        onSuccess: res => {
            console.log('New Competencie', res.dara)
            setTitle('')
            setPercent('')
            setSuccessMsg('Competencis creada')
            setCompetencies([ ...competencies, res.data ])
        },
        onError: err => {
            console.log(err)
            setErrorMsg('Ocurrió un error, inténtelo denuevo')}
    })

    const handleCreateCompetencie = () => {
        setSuccessMsg('')
        setErrorMsg('')
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
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
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