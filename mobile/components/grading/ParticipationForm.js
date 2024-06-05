import { Text, ScrollView, View } from "react-native"
import califications from "../../data/califications"
import TextSummary from "../utils/TextSummary"
import Select from "../utils/Select"
import Title from "../utils/Title"
import { useState } from "react"

const ParticipationForm = () => {

    const [ calification, setCalification ] = useState({})

  return (
    <ScrollView style={{backgroundColor: '#fff', flex:1}}>
        <Title 
            text={'Nueva Participación'}
        />
        {/* {console.log('califications', califications[2])} */}
        {console.log('calification', calification?.calification)}
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
        {/* 
            Observations
            Competences
            Capacities
        */}
    </ScrollView>
  )
}

export default ParticipationForm