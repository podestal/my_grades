import { useState } from "react"
import InputText from "../../utils/InputText"
import { SearchSelect, SearchSelectItem } from "@tremor/react"

const CreateParticipation = ({ student }) => {

    const [calification, setCalification] = useState('')
    const [observations, setObservations] = useState('')
    const [competences, setCompetences] = useState('')
    const [capacities, setCapcities] = useState('')
    const [date, setDate] = useState('')

  return (
    <div>
        <InputText 
            label={'Observaciones'}
        />
        calification
        observations
        competences
        capacities
        date
    </div>
  )
}

export default CreateParticipation