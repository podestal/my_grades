import { StyleSheet, ScrollView, Text, View, Pressable, Button } from "react-native"
import ButtonElement from "../utils/Button"
import Input from "../utils/Input"
import { useEffect, useState } from "react"
import Title from "../utils/Title"
import { createAssignment } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"
import Calendario from "../utils/Calendario"
import Select from "../utils/Select"
import { useNavigation } from "@react-navigation/native"
import { capacitiesData, getFilteredCapacities } from "../../data/capacities"
import { competenciesData, getFilteredCompetences } from "../../data/competencies"
import Options from "../utils/Options"

const AssignmentForm = ({ route }) => {

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
    const queryClient = useQueryClient()
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const navigator = useNavigation()
    const [selected, setSelected] = useState("")

    const filteredCometences = getFilteredCompetences(area)
    const filteredCapacities = competence && getFilteredCapacities(competence?.id)

    const {mutate: createAssignmentMutation} = useMutation({
        mutationFn: data => createAssignment(data),
        onSuccess: res => {
            setSuccessMsg('Su tarea ha sido creada')
            queryClient.invalidateQueries(['assignments'])
        },
        onError: err => setErrorMsg('Ocurrió un error, vuélvalo a intentar')
    })

    const handleSelectCompetence = (competence) => {
        console.log(competence)
    }

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
            createAssignmentMutation({ 
                token: user.access, 
                assignment:{
                    title,
                    due_date: dueDate,
                    competence,
                    assignature: assignatureId,
                    capacity
                } 
            })
            setTitle('')
            setDueDate('')
            setCompetence('')
            navigator.goBack()
        }
        catch {
            console.log('Ocurrió un error')
        }
            
    }

    useEffect(() => {
        console.log('Competence: ',competence)
    }, [competence])

  return (
    <ScrollView style={{backgroundColor: '#fff', flex:1}}>
        <Title 
            text={'Crea una Actividad'}
        />
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {titleError && <ErrorMsg>{titleError}</ErrorMsg>}
        <Input 
            label={'Título de la tarea'}
            value={title}
            setter={setTitle}
        />
        {dueDateError && <ErrorMsg>{dueDateError}</ErrorMsg>}
        <Calendario 
            setDueDate={setDueDate}
            title={'Fecha de entrega'}
        />
        {competenceError && <ErrorMsg>{competenceError}</ErrorMsg>}
        {competence
        ?
        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Competencia</Text>
            <Text style={styles.text}>{competence.title}</Text>
            <Button onPress={() => {
                setCompetence()
                setCapacity()}} title="Seleccionar Competencia"/>
        </View> 
        :
        <View>
            <Text>Selecciona una Competencia</Text>
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
        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Capacidad</Text>
            <Text style={styles.text}>{capacity.title}</Text>
            <Button onPress={() => setCapacity()} title="Seleccionar Capacidad"/>
        </View> 
        :
        competence && <View>
            <Text>Selecciona una Capacidad</Text>
            {filteredCapacities.map(capacity => (
                <Options 
                    key={capacity.id}
                    item={capacity}
                    setter={setCapacity}
                />
            ))}
        </View>
        }
        {/* <Select 
            setter={setCompetence}
            title={'Competencia'}
            data={competenciesData}
        />
        {console.log('competenciesData:', competenciesData)}
        {console.log('filteredCometences: ', filteredCometences)} */}

        
        {/* <Select 
            setter={setCapacity}
            title={'Capacity'}
            data={capacitiesData.filter( capactity => capactity.competence == 5)}
        /> */}
        {/* <Select 
            setter={setCompetence}
            title={'Competencia'}
            apiGetter={getCompetencies}
            filter={area}
            keyWord={'competencies'}
        />
        {console.log('competence',competence)}
        } */}
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        />
        {/* {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {titleError && <ErrorMsg>{titleError}</ErrorMsg>}
        <Input 
            label={'Título de la tarea'}
            value={title}
            setter={setTitle}
        />
        {dueDateError && <ErrorMsg>{dueDateError}</ErrorMsg>}
        <Calendario 
            setDueDate={setDueDate}
            title={'Fecha de entrega'}
        />
        {competenceError && <ErrorMsg>{competenceError}</ErrorMsg>}
        <Select 
            setCompetence={setCompetence}
            title={'Competencia'}
        />
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        /> */}
    </ScrollView>
  )
}

export default AssignmentForm

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
        marginVertical: 12,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 16,
    }

})