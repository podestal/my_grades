import { useQuery } from '@tanstack/react-query'
import { getGrades } from '../../api/api'
import useAuth from '../../hooks/useAuth'
import { StyleSheet, Text, View } from 'react-native'
import Grade from './Grade'
import List from '../utils/List'
import Input from '../utils/Input'
import { useState } from 'react'

const Grades = ({ route }) => {

    const { user } = useAuth()
    const activityId = route.params.activityId
    const [name, setName] = useState('')
    const [filteredGrades, setFilteredGrades] = useState('')

    const {data: grades, isLoading, isError, error, isSuccess} = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, activityId }),
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>


  return (

    <>
        <View style={{backgroundColor:'#fff', padding: 10}}>      
            <Input 
                label={'Buscar...'}
                value={name}
                setter={setName}
                placeholder={'Nombre o Apellido'}
            />
            <List 
                data={grades.data.filter( grade => (
                    grade?.student?.first_name.toLowerCase().includes(name.toLocaleLowerCase()) ||  
                    grade?.student?.last_name.toLowerCase().includes(name.toLocaleLowerCase()))
                )}
                style={{marginBottom: 250}}
                DetailComponent={Grade}
            />
        </View>    
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