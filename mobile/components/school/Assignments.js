import { FlatList, StyleSheet, Text } from "react-native"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getAssignments, getCompetencies } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import useCompetencies from "../../hooks/useCompetencies"
import Assignment from "./Assignment"
import List from "../utils/List"
import AssignmentForm from "./AssignmentForm"
import { useEffect } from "react"

const Assignments = ({ route }) => {

    const assignatureId = route.params.assignatureId
    const {user} = useAuth()
    const {setCompetencies} = useCompetencies()

    // const {mutate: getCompetencies} = useMutation({
    //     mutationFn: data => getCompetencies(data),
    //     onSuccess: res => console.log(res.data)
    // })

    // useEffect(() => {
    //     getCompetencies({ token: user.access })
    // })

    const {data: assignments, isLoading, isError, error} = useQuery({
        queryKey: ['assignments'],
        queryFn: () => getAssignments({token: user.access, assignature:assignatureId}),
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <> 
        <AssignmentForm />
        {assignments && 
            <List 
                data={assignments.data}
                DetailComponent={Assignment}
            />
        }
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