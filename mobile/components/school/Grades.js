import Title from '../utils/Title'
import { useQuery } from '@tanstack/react-query'
import { getGrades } from '../../api/api'
import useAuth from '../../hooks/useAuth'
import { StyleSheet, Text, FlatList } from 'react-native'
import Grade from './Grade'
import List from '../utils/List'

const Grades = ({ route }) => {

    const { user } = useAuth()
    const assignmentId = route.params.assignmentId

    const {data: grades, isLoading, isError, error} = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, assignmentId }),
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>  
        <List 
            data={grades.data}
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