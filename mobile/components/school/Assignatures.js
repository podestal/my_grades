import { useQuery } from "@tanstack/react-query"
import { getAssignatures } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { Text, StyleSheet, View } from "react-native"
import Assignature from "./Assignature"
import List from "../utils/List"
import useAssignatures from "../../hooks/useAssignatures"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const Assignatures = () => {

    const {user} = useAuth()
    const { setAssignatures } = useAssignatures()

    const { data: assignatures, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignatures(user.access)
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

    if (isSuccess) {
        setAssignatures(assignatures.data)
    }

  return (
    <NonScrollableContainer>
        <List 
            data={assignatures.data}
            DetailComponent={Assignature}
        />
    </NonScrollableContainer>
  )
}

export default Assignatures
