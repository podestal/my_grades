import { Text, ScrollView, View, Button } from "react-native"
import califications from "../../data/califications"
import MultiOptions from "../utils/MultiOptions"
import TextSummary from "../utils/TextSummary"
import Select from "../utils/Select"
import Title from "../utils/Title"
import { useState } from "react"
import useCompetencies from "../../hooks/useCompetencies"
import useCapacities from "../../hooks/useCapacities"
import { competenciesData } from "../../data/competencies"
import { capacitiesData } from "../../data/capacities"
import MultiTextSummary from "../utils/MultiTextSummary"

const ParticipationForm = ({ assignature, student }) => {

    const [ calification, setCalification ] = useState({})

    // LOCAL  STATE
    const { competencies, setCompetencies } = useCompetencies()
    const { capacities, setCapacities } = useCapacities()

    // SHOW SELECT
    const [openCompetencesOptions, setOpenCompetencesOptions] = useState(competencies.length > 0 ? false : true)
    const [openCapacitiesOptions, setOpenCapacitiesOptions] = useState(capacities.length > 0 ? false : true)

    // FILTERS
    const filteredCometences = competenciesData.filter( comp => comp.area == assignature?.area)
    const filteredCapacities = competencies.length > 0 ? capacitiesData.filter( capacity => competencies.indexOf(capacity.competence) >= 0) : []
    

  return (
    <ScrollView style={{backgroundColor: '#fff', flex:1}}>
        <Title 
            text={'Nueva Participación'}
        />
        {console.log('local competencies', competencies)}
        {console.log('filterCapacities', filteredCapacities)}
        {/* {console.log('califications', califications[2])} */}
        {/* 
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
        {/* title, items, setShow, setItem, extraSetter, idsSetter, openSetter  */}
        {openCompetencesOptions 
        ? 
        <>
            <Text style={{fontSize: 24, textAlign: 'center', marginBottom: 18,}}>Competencias</Text>
            {filteredCometences.map(competence => (
                <MultiOptions 
                    key={competence.id}
                    item={competence}
                    idsSetter={setCompetencies}
                    selectedOptions={competencies}
                    extraSetter={setCapacities}
                    setShowOptions={setOpenCapacitiesOptions}
                />
            ))}
            <Button title="Hecho" onPress={() => setOpenCompetencesOptions(false)}/>
        </> 
        : 
        <MultiTextSummary 
            title={'Competencias'}
            items={filteredCometences.filter(competence => competencies.indexOf(competence.id) >= 0)}
            setShow={setOpenCompetencesOptions}
        />
        }
        {openCapacitiesOptions 
        ? 
        <>
            <Text style={{fontSize: 24, textAlign: 'center', marginBottom: 18, }}>Capacidades</Text>
            {competencies.length > 0 && 
            filteredCapacities.map( capacity => (
                <MultiOptions 
                    key={capacity.id}
                    item={capacity}
                    idsSetter={setCapacities}
                    selectedOptions={capacities}
                />
            ))
            }
            <Button title="Hecho" onPress={() => setOpenCapacitiesOptions(false)}/>
        </> 
        : 
        <MultiTextSummary 
            title={'Capacidades'}
            items={filteredCapacities.filter(capacity => capacities.indexOf(capacity.id) >= 0)}
            setShow={setOpenCapacitiesOptions}
        />
        }

        {/* 
            Observations
            Competences
            Capacities
        */}
    </ScrollView>
  )
}

export default ParticipationForm