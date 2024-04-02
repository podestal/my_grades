import { StyleSheet, ScrollView, Text, View } from "react-native"
import ButtonElement from "../utils/Button"
import Input from "../utils/Input"
import { useState } from "react"
import Title from "../utils/Title"
import { createActivity } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"
import Calendario from "../utils/Calendario"
import { getFilteredCapacities } from "../../data/capacities"
import { getFilteredCompetences } from "../../data/competencies"
import Options from "../utils/Options"
import TextSummary from "../utils/TextSummary"
import useActivities from "../../hooks/useActivities"

const ActivityForm = ({ route }) => {

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('') 
    const [dueDate, setDueDate] = useState('')
    const [dueDateError, setDueDateError] = useState('')
    const [competence, setCompetence] = useState('')
    const [capacity, setCapacity] = useState('')
    const [competenceError, setCompetenceError] = useState('')
    const area = route?.params?.assignature?.area
    const assignatureId = route?.params?.assignature?.id
    const { user } = useAuth()
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const {activities, setActivities} = useActivities()
    const filteredCometences = getFilteredCompetences(area)
    const filteredCapacities = competence && getFilteredCapacities(competence?.id)

    const {mutate: createActivityMutation} = useMutation({
        mutationFn: data => createActivity(data),
        onSuccess: res => {
            setSuccessMsg('Su tarea ha sido creada'),
            setActivities([ ...activities, res.data])
        },
        onError: err => {
            setErrorMsg('Ocurrió un error, vuélvalo a intentar')
            console.log('Error',err);
        }
    })

    const handleCreateAssignment = () => {

        setErrorMsg('')
        setSuccessMsg('')
        setTitleError('')
        setDueDateError('')
        setCompetenceError('')
        if (title.length == 0) {
            setTitleError('Se necesita un título para la tarea')
            return
        }
        if (dueDate.length == 0) {
            setDueDateError('Porfavor, seleccione una fecha de entrega')
            return
        }
        if (competence.length == 0) {
            setCompetenceError('Porfavor, seleccione una competencia')
            return
        }
        try {
            createActivityMutation({ 
                token: user.access, 
                activity:{
                    title,
                    due_date: dueDate,
                    competence: competence.id,
                    assignature: assignatureId,
                    capacity: capacity.id
                } 
            })
            setTitle('')
            setDueDate('')
            setCompetence('')

        }
        catch {
            console.log('Ocurrió un error')
        }
            
    }

  return (
    <ScrollView style={{backgroundColor: '#fff', flex:1}}>
        <Title 
            text={'Crea una Actividad'}
        />
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {titleError && <ErrorMsg>{titleError}</ErrorMsg>}
        <Text style={styles.textTitle}>Título de la Tarea</Text>
        <Input 
            // label={'Título de la tarea'}
            value={title}
            setter={setTitle}
        />
        {dueDateError && <ErrorMsg>{dueDateError}</ErrorMsg>}
        {dueDate 
        ?
        <TextSummary 
            title={'Fecha de entrega'}
            item={dueDate}
            setItem={setDueDate}
        />
        :
        <>
            <Text style={styles.textTitle}>Selecciona una fecha de entrega</Text>
            <Calendario 
                setDueDate={setDueDate}
            />
        </>
        }
        {competenceError && <ErrorMsg>{competenceError}</ErrorMsg>}
        {competence
        ?
        <TextSummary 
            title={'Competencia'}
            item={competence.title}
            setItem={setCompetence}
            extraSetter={setCapacity}
        />
        :
        <View>
            <Text style={styles.textTitle}>Selecciona una Competencia</Text>
            {filteredCometences.map(competence => (
                <Options 
                    key={competence.id}
                    item={competence}
                    setter={setCompetence}
                />
            ))}
        </View>
        }
        {capacity 
        ? 
        <TextSummary 
            title={'Capacidad'}
            item={capacity.title}
            setItem={setCapacity}
        />
        :
        competence && <View>
            <Text style={styles.textTitle}>Selecciona una Capacidad</Text>
            {filteredCapacities.map(capacity => (
                <Options 
                    key={capacity.id}
                    item={capacity}
                    setter={setCapacity}
                />
            ))}
        </View>
        }
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        />
    </ScrollView>
  )
}

export default ActivityForm

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
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