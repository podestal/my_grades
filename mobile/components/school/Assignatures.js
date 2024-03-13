import { useQuery } from "@tanstack/react-query"
import { getAssignatures } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { FlatList, Text, View, StyleSheet, Pressable } from "react-native"
import Assignature from "./Assignature"

const Assignatures = () => {

    const {user} = useAuth()

    const { data: assignatures } = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignatures(user.access)
    })

  return (
    <>
        {assignatures && <FlatList 
            data={assignatures.data}
            keyExtractor={ item => item.id}
            style={styles.container}
            contentContainerStyle={styles}
            renderItem={ itemData => <Assignature assignature={itemData.item} />}
        />}
    </>
  )
}

export default Assignatures

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