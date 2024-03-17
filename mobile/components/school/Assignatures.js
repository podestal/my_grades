import { useQuery } from "@tanstack/react-query"
import { getAssignatures } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { Text, StyleSheet } from "react-native"
import Assignature from "./Assignature"
import List from "../utils/List"

const Assignatures = () => {

    const {user} = useAuth()

    const { data: assignatures, isLoading, isError, error } = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignatures(user.access)
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
    
        <List 
            data={assignatures.data}
            DetailComponent={Assignature}
        />

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