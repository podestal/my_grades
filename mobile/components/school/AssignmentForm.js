import { View, Button, StyleSheet } from "react-native"
import useCompetencies from "../../hooks/useCompetencies"
import Container from "../utils/Container"
import ButtonElement from "../utils/Button"
import Input from "../utils/Input"
import { useEffect, useState } from "react"
import Title from "../utils/Title"
import { createAssignment } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";

const AssignmentForm = ({ route }) => {

    const {competencies} = useCompetencies()
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [competence, setCompetence] = useState('')
    const assignatureId = route?.params?.assignatureId
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const today = toDateId(new Date(2024, currentMonth, 1))
    const [selectedDate, setSelectedDate] = useState(today);

    const {mutate: createAssignmentMutation} = useMutation({
        mutationFn: data => createAssignment(data),
        onSuccess: res => {
            setSuccessMsg('Su tarea ha sido creada')
            queryClient.invalidateQueries(['assignments'])
        },
        onError: err => setErrorMsg('Ocurrió un error, vuélvalo a intentar')
    })

    // useEffect(() => {
    //     console.log('competencies from assignment form', competencies);
    //     console.log('current month',currentMonth)
    // }, [])

    const handleCreateAssignment = () => {

        setErrorMsg('')
        setSuccessMsg('')
        try {
            createAssignmentMutation({ 
                token: user.access, 
                assignment:{
                    title,
                    due_date: dueDate,
                    competence,
                    assignature: assignatureId,
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
    <View style={{backgroundColor: '#fff', flex:1}}>
        {console.log('Selected', selectedDate)}
        {/* <Title text={'Crear Assignment'}/> */}
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        <Input 
            label={'Título'}
            value={title}
            setter={setTitle}
        />
        {/* <Input 
            label={'Fecha de entrega'}
            value={dueDate}
            setter={setDueDate}
        /> */}
        <View style={styles.buttonsContainer}>
            <Button onPress={() => setCurrentMonth(currentMonth-1)} title="previous"/>
            <Button onPress={() => setCurrentMonth(currentMonth+1)} title="next"/>
        </View>
        <Calendar
            calendarActiveDateRanges={[
                {
                startId: selectedDate,
                endId: selectedDate,
                },
            ]}
            calendarFirstDayOfWeek="sunday"
            calendarMonthId={today}
            calendarRowHorizontalSpacing={16}
            calendarRowVerticalSpacing={16}
            calendarInitialMonthId={today}
            onCalendarDayPress={setSelectedDate}
            
        />
        <Input 
            label={'Competencia'}
            value={competence}
            setter={setCompetence}
        />
        <ButtonElement 
            title={'Crear'}
            onPress={handleCreateAssignment}
        />
    </View>
  )
}

export default AssignmentForm

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})