import { StyleSheet, ScrollView, Text, View, Button } from "react-native"
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
import useCategories from "../../hooks/useCategories"
import { getCurrentQuarter } from "../utils/GetCurrentQuarter"
import { quartersData } from "../../data/quarters"
import MultiOptions from "../utils/MultiOptions"
import MultiTextSummary from "../utils/MultiTextSummary"
import { capacitiesData } from "../../data/capacities"

const ActivityForm = ({ route }) => {

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('') 
    const [dueDate, setDueDate] = useState('')
    const [dueDateError, setDueDateError] = useState('')
    const [selectedCompetences, setSelectedCompetences] = useState([])
    const [competencesIds, setCompetencesIds] = useState([])
    const [selectedCapacities, setSelectedCapacities] = useState([])
    const [capacitiesIds, setCapacitiesIds] = useState([])
    const [capacity, setCapacity] = useState('')
    const [competenceError, setCompetenceError] = useState('')
    const [capacityError, setCapacityError] = useState('')
    const area = route?.params?.assignature?.area
    const assignatureId = route?.params?.assignature?.id
    const { user } = useAuth()
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const {activities, setActivities} = useActivities()
    const filteredCometences = getFilteredCompetences(area)
    const filteredCapacities = selectedCompetences && capacitiesData.filter( capacity => competencesIds.indexOf(capacity.competence) >= 0)
    const { categories } = useCategories()
    const [selectedCategory, setSelectedCategory] = useState({})
    const currentQuarter = getCurrentQuarter(quartersData)
    const [quarter, setQuarter] = useState(currentQuarter)
    const [openCompetencesOptions, setOpenCompetencesOptions] = useState(true)
    const [openCapacitiesOptions, setOpenCapacitiesOptions] = useState(true)

    const {mutate: createActivityMutation} = useMutation({
        mutationFn: data => createActivity(data),
        onSuccess: res => {
            setSuccessMsg('Su tarea ha sido creada'),
            setActivities([ ...activities, res.data])
        },
        onError: err => {
            console.log('err',err);
            setErrorMsg('Ocurrió un error, vuélvalo a intentar')
        }
    })

    const handleCreateAssignment = () => {
        setErrorMsg('')
        setSuccessMsg('')
        setTitleError('')
        setDueDateError('')
        setCompetenceError('')
        setCapacityError('')
        if (title.length == 0) {
            setTitleError('Se necesita un título para la tarea')
            return
        }
        if (dueDate.length == 0) {
            setDueDateError('Porfavor, seleccione una fecha de entrega')
            return
        }
        if (selectedCompetences.length == 0) {
            setCompetenceError('Porfavor, seleccione al menos una competencia')
            return
        }
        if (selectedCapacities.length == 0) {
            setCapacityError('Porfavor, seleccione al menos una capacidad')
            return
        }
        try {
            createActivityMutation({ 
                token: user.access, 
                activity:{
                    title,
                    due_date: dueDate,
                    competences: competencesIds.toString(),
                    assignature: assignatureId,
                    capacities: capacitiesIds.toString(),
                    category: 1,
                    quarter: 'Q2'
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
        {quarter?.id
        ? 
        <TextSummary 
            title={'Bimestre'}
            item={quarter?.title}
            setItem={setQuarter}
        /> 
        : 
        <View>
            <Text style={styles.textTitle}>Selecciona un bimestre</Text>
            {quartersData.map(quarter => (
                <Options 
                    key={quarter.id}
                    item={quarter}
                    setter={setQuarter}
                />
            ))}
        </View>
        }
        {selectedCategory?.title 
        ? 
        <TextSummary 
            title={'Categoría'}
            item={selectedCategory?.title}
            setItem={setSelectedCategory}
        /> 
        : 
        <View>
            <Text style={styles.textTitle}>Selecciona una Categoría</Text>
            {categories.map(category => (
                <Options 
                    key={category.id}
                    item={category}
                    setter={setSelectedCategory}
                    
                />
            ))}
        </View>
        }
        {competenceError && <ErrorMsg>{competenceError}</ErrorMsg>}
        {openCompetencesOptions 
        ? 
        <View>
            <Text style={styles.textTitle}>Selecciona una Competencia</Text>
            {filteredCometences.map(competence => (
                <MultiOptions 
                    key={competence.id}
                    item={competence}
                    setter={setSelectedCompetences}
                    state={selectedCompetences}
                    idsSetter={setCompetencesIds}
                />
            ))}
            <Button title="Hecho" onPress={() => setOpenCompetencesOptions(false)}/>
        </View> 
        : 
        <MultiTextSummary 
            title={'Competencias'}
            items={selectedCompetences}
            setShow={setOpenCompetencesOptions}
            setItem={setSelectedCompetences}
            extraSetter={setSelectedCapacities}
            idsSetter={setCapacitiesIds}
            openSetter={setOpenCapacitiesOptions}
        />
        }
        {capacityError && <ErrorMsg>{capacityError}</ErrorMsg>}
        {selectedCompetences.length > 0 &&
        <>
            {openCapacitiesOptions 
            ? 
            <View>
                <Text style={styles.textTitle}>Selecciona una Capacidad</Text>
                {filteredCapacities.map(capacity => (
                    <MultiOptions 
                        key={capacity.id}
                        item={capacity}
                        setter={setSelectedCapacities}
                        state={selectedCapacities}
                        idsSetter={setCapacitiesIds}
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
        {/* {selectedCompetences.length > 0 &&
            
        } */}
        {/* {competenceError && <ErrorMsg>{competenceError}</ErrorMsg>}
        {competence.length > 0
        ?
        <TextSummary 
            title={'Competencias'}
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
        } */}
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