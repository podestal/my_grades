import { Text, ScrollView, View } from "react-native"
import califications from "../../data/califications"
import MultiOptions from "../utils/MultiOptions"
import TextSummary from "../utils/TextSummary"
import Select from "../utils/Select"
import Title from "../utils/Title"
import { useState } from "react"
import useCompetencies from "../../hooks/useCompetencies"
import { competenciesData } from "../../data/competencies"

const ParticipationForm = ({ assignature, student }) => {

    const [ calification, setCalification ] = useState({})
    const filteredCometences = competenciesData.filter( comp => comp.area == assignature?.area)
    const [selectedCompetences, setSelectedCompetences] = useState()
    const { competencies, setCompetencies } = useCompetencies()

  return (
    <ScrollView style={{backgroundColor: '#fff', flex:1}}>
        <Title 
            text={'Nueva Participación'}
        />
        {/* {console.log('califications', califications[2])} */}
        {/* {console.log('filteredCometences', filteredCometences)}
        {console.log('assignature', assignature)} */}
        {calification?.id 
        ? 
        <TextSummary 
            title={'Calificación'}
            item={calification.calification}
            setItem={setCalification}
        /> 
        : 
        <Select 
            setter={setCalification}
            data={califications}
            label={'calification'}
            hideSelected={'none'}
            title={'Nota'}
        />
        }
        {/* <Text style={styles.textTitle}>Seleccione sus competencias</Text> */}
        {filteredCometences.map(competence => (
            <MultiOptions 
                key={competence.id}
                item={competence}
                idsSetter={setCompetencies}
                selectedOptions={competencies}
            />
        ))}
        {/* 
            Observations
            Competences
            Capacities
        */}
    </ScrollView>
  )
}

export default ParticipationForm