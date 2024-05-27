import { Text, ScrollView, View, StyleSheet } from "react-native"
import MultiOptions from "../utils/MultiOptions"
import MultiTextSummary from "../utils/MultiTextSummary"
import { getFilteredCompetences } from "../../data/competencies"
import useCompetencies from "../../hooks/useCompetencies"
import { useState } from "react"

const SelectCompsAndCaps = ({ route }) => {

    const area = route?.params?.assignature?.area
    const filteredCometences = getFilteredCompetences(area)

    const [openCompetencesOptions, setOpenCompetencesOptions] = useState(true)
    const [selectedCompetences, setSelectedCompetences] = useState([])

    const { competencies, setCompetencies } = useCompetencies()

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'fff'}}>
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
        </View> 
        <View style={styles.choicesContainer}>
            <Text style={styles.textTitle}>Seleccione sus capacidades</Text>
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
        </View> 
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