import { useQuery } from '@tanstack/react-query'
import { getGrades } from '../../api/api'
import useAuth from '../../hooks/useAuth'
import { StyleSheet, Text, TextInput } from 'react-native'
import Grade from './Grade'
import List from '../utils/List'
import Input from '../utils/Input'
import { useState } from 'react'

const Grades = ({ route }) => {

    const { user } = useAuth()
    const assignmentId = route.params.assignmentId
    const [name, setName] = useState('')
    const [filteredGrades, setFilteredGrades] = useState('')

    const {data: grades, isLoading, isError, error, isSuccess} = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, assignmentId }),
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>


  return (
    <>      
            {/* <Title  text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/> */}
        <TextInput 
            placeholder='Nombre o Apellido'
            value={name}
            onChangeText={(value) => setName(value)}
        />
        <List 
            data={grades.data.filter( grade => (
                grade?.student?.first_name.toLowerCase().includes(name.toLocaleLowerCase()) ||  
                grade?.student?.last_name.toLowerCase().includes(name.toLocaleLowerCase()))
            )}
            DetailComponent={Grade}
        />
    </>
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