import { Text, ScrollView, View, StyleSheet, Button } from "react-native"
import MultiOptions from "../utils/MultiOptions"
import MultiTextSummary from "../utils/MultiTextSummary"
import { getFilteredCompetences } from "../../data/competencies"
import useCompetencies from "../../hooks/useCompetencies"
import useCapacities from "../../hooks/useCapacities"
import { useState } from "react"
import { capacitiesData } from "../../data/capacities"
import ErrorMsg from "../utils/ErrorMsg"

const SelectCompsAndCaps = ({ route }) => {

    const area = route?.params?.assignature?.area
    const filteredCometences = getFilteredCompetences(area)
    const { competencies, setCompetencies } = useCompetencies()
    const [selectedCompetences, setSelectedCompetences] = useState(competencies && competencies || [])
    const [selectCompetencesError, setSelectCompetencesError] = useState(false)


    const filteredCapacities = selectedCompetences && capacitiesData.filter( capacity => competencies.indexOf(capacity.competence) >= 0)
    const { capacities, setCapacities } = useCapacities()
    const [selectedCapacities, setSelectedCapacities] = useState(capacities && capacities || [])


    const [openCompetencesOptions, setOpenCompetencesOptions] = useState(true)
    const [openCapacitiesOptions, setOpenCapacitiesOptions] = useState(true)

    const handleDoneCompetencePress = () => {

        setSelectCompetencesError(false)

        if (selectedCompetences.length == 0) {
            setSelectCompetencesError(true)
            return
        }
        setOpenCapacitiesOptions(true)
        setOpenCompetencesOptions(false)
    }

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'fff'}}>
        {selectCompetencesError && <ErrorMsg>Tiene que elegir al menos una competencia</ErrorMsg>}
        {openCompetencesOptions 
        ? 
        <View style={styles.choicesContainer}>
            <Text style={styles.textTitle}>Seleccione sus competencias</Text>
            {filteredCometences.map(competence => (
                <MultiOptions 
                    key={competence.id}
                    item={competence}
                    setter={setSelectedCompetences}
                    state={selectedCompetences}
                    idsSetter={setCompetencies}
                    selectedOptions={competencies}
                />
            ))}
            <Button title="Hecho" onPress={handleDoneCompetencePress}/>
        </View> 
        : 
        <MultiTextSummary 
            title={'Competencias'}
            items={selectedCompetences}
            setShow={setOpenCompetencesOptions}
            setItem={setSelectedCompetences}
            extraSetter={setSelectedCapacities}
            idsSetter={setCompetencies}
            // openSetter={setOpenCapacitiesOptions}
        />
        }


        {selectedCompetences.length > 0 &&
            <>
            {openCapacitiesOptions 
            ? 
            <View style={styles.choicesContainer}>
                <Text style={styles.textTitle}>Seleccione sus capacidades</Text>
                {filteredCapacities.map(capacity => (
                    <MultiOptions 
                        key={capacity.id}
                        item={capacity}
                        setter={setSelectedCapacities}
                        state={selectedCapacities}
                        idsSetter={setCapacities}
                        selectedOptions={capacities}
                    />
                ))}
                <Button title="Hecho" onPress={() => setOpenCapacitiesOptions(false)}/>
            </View>  
            : 
            <MultiTextSummary 
                title={'Capacidades'}
                items={selectedCapacities}
                setShow={setOpenCapacitiesOptions}
                setItem={setSelectedCapacities}
            />
            }
            </>
        }
    </ScrollView>
  )
}

export default SelectCompsAndCaps

const styles = StyleSheet.create({
    choicesContainer: {
        marginVertical: 22
    },
    textTitle: {
        fontSize: 22,
        textAlign: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 16,
    }

})