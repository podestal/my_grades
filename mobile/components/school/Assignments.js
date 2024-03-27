import { StyleSheet, Text, View, Button } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { getAssignments } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import Assignment from "./Assignment"
import List from "../utils/List"
import ButtonElement from "../utils/Button"
import { useNavigation } from "@react-navigation/native"

const Assignments = ({ route }) => {

    const assignatureId = route.params.assignatureId
    const assignature = route.params.assignature
    const {user} = useAuth()
    const navigator = useNavigation()

    const {data: assignments, isLoading, isError, error} = useQuery({
        queryKey: ['assignments'],
        queryFn: () => getAssignments({token: user.access, assignature:assignatureId}),
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        <ButtonElement 
            title={'Crear'}
            onPress={() => navigator.navigate('Create-Assignment', {
                assignatureId,
                assignature
            })}
        />
        {assignments && 
            <View style={{ backgroundColor: '#fff' }}> 
                <List 
                    data={assignments.data}
                    DetailComponent={Assignment}
                    style={{marginBottom: 50}}
                />
            </View>
        }
    </>
  )
}

export default Assignments



const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
