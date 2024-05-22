import { useState } from "react"
import InputText from "../../utils/InputText"
import { SearchSelect, SearchSelectItem, DatePicker, Button } from "@tremor/react"
import MultiSelector from "../../utils/MultiSelector"
import { competenciesData } from "../../data/competencies"
import { capacitiesData } from "../../data/capacities"
import { es } from 'date-fns/locale'
import useAuth from "../../hooks/useAuth"
import moment from "moment"
import GenericCallout from "../../utils/GenericCallout"

const ParticipationForm = ({ student, assignature, create, quarter, disable, error, success }) => {

    const { user } = useAuth()
    const [calification, setCalification] = useState('NA')
    const [observations, setObservations] = useState('')
    const [date, setDate] = useState(new Date())

    const filteredCompetencies = competenciesData.filter( competency => competency.area == assignature.area)
    const [competences, setCompetences] = useState([])
    const filteredCapacities = competences.length > 0 && capacitiesData.filter( capacity => competences.indexOf(capacity.competence) >= 0)
    const [capacities, setCapacities] = useState([])

    const handleSubmit = () => {
        const formattedDate = moment(date).format('YYYY-MM-DD')
        create && create({ token: user.access, participation: {
            competences: competences.toString(),
            capacities: capacities.toString(),
            calification,
            observations,
            created_at: formattedDate,
            quarter,
            student: student.id,
            assignature: assignature.id

        } })
    }
   

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-[100%]">
        {error && <GenericCallout conditionalMsg={'Ocurrió un error'} title={'Error'} color={'red'}/>}
        {success && <GenericCallout conditionalMsg={'Su participación se ha creado con éxito'} title={'Exito'} color={'teal'}/>}
        <SearchSelect className="w-[70px] mx-auto" value={calification} 
            onValueChange={ value => setCalification(value)}>
            <SearchSelectItem value="AD">AD</SearchSelectItem>
            <SearchSelectItem value="A">A</SearchSelectItem>
            <SearchSelectItem value="B">B</SearchSelectItem>
            <SearchSelectItem value="C">C</SearchSelectItem>
            <SearchSelectItem value="NA">NA</SearchSelectItem>
         </SearchSelect>
         <InputText 
            label={'Observaciones'}
            value={observations}
            setter={setObservations}
            // error={}
            // errorMsg={}
            textArea={true}
        />
        <MultiSelector label={'Competencias'} value={competences} setter={setCompetences} items={filteredCompetencies}/>
        {competences.length > 0 && <MultiSelector label={'Capacidades'} value={capacities} setter={setCapacities} items={filteredCapacities}/>}
        <DatePicker 
            value={date}
            onValueChange={value => setDate(value)}
            locale={es}
            className="w-[270px]"
        />
        <Button disabled={disable} onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">Guardar</Button> 
    </div>
  )
}

export default ParticipationForm