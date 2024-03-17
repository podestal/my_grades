import Title from '../utils/Title'
import { useQuery } from '@tanstack/react-query'
import { getGrades } from '../../api/api'
import useAuth from '../../hooks/useAuth'
import { StyleSheet, Text, FlatList } from 'react-native'
import Grade from './Grade'

const Grades = () => {

    const { user } = useAuth()

    const {data: grades} = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access })
    })

  return (
    <>  
        {grades && <FlatList 
            data={grades.data}
            keyExtractor={ item => item.id}
            style={styles.container}
            contentContainerStyle={styles}
            renderItem={ itemData => <Grade grade={itemData.item} />}
        />}
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