import Title from "../utils/Title"
import Input from "../utils/Input"
import ButtonElement from "../utils/Button"
import { useState } from "react"
import Container from "../utils/Container"

const CompetenciesForm = () => {

    const [title, setTitle] = useState('')
    const [percent, setPercent] = useState('')

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
        />
    </Container>
  )
}

export default CompetenciesForm