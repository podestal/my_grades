import { FlatList, StyleSheet } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { getAssignments } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import Assignment from "./Assignment"

const Assignments = ({ route }) => {

    const assignatureId = route.params.assignatureId
    const {user} = useAuth()
    const {data: assignments} = useQuery({
        queryKey: ['assignments'],
        queryFn: () => getAssignments({token: user.access, assignature:assignatureId})
    })

  return (
    <>
        {assignments && <FlatList 
            data={assignments.data}
            keyExtractor={ item => item.id}
            style={styles.container}
            contentContainerStyle={styles}
            renderItem={ itemData => <Assignment assignment={itemData.item} />}
        />}
    </>
  )
}

export default Assignments

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