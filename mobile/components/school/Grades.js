import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import GradesApi from './GradesApi'
import useGrades from '../../hooks/useGrades'
import Grade from './Grade'
import Input from '../utils/Input'
import List from '../utils/List'


const Grades = ({ route }) => {

    const activityId = route.params.activityId
    const [name, setName] = useState('')
    const { grades } = useGrades()
    const filteredGrades = grades.length > 0 ?  grades.filter( grade => grade?.activity?.id == activityId) : []



  return (
    <View style={{backgroundColor:'#fff', padding: 10}}> 
        {console.log('grades length', grades.length)}
        {console.log('grades', grades)}
        {filteredGrades.length == 0 
        ? 
        <GradesApi 
            activityId={activityId}
            name={name}
            setName={setName}
        />
        :
        <>
            <Input
                label={'Buscar...'}
                value={name}
                setter={setName}
                placeholder={'Nombre o Apellido'}
            />
            <List 
                data={filteredGrades.filter( grade => (
                    grade?.student?.first_name.toLowerCase().includes(name.toLocaleLowerCase()) ||  
                    grade?.student?.last_name.toLowerCase().includes(name.toLocaleLowerCase()))
                )}
                style={{marginBottom: 250}}
                DetailComponent={Grade}
            /> 
        </>
    }
    </View>    

  )
}

export default Grades

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 40, 
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})