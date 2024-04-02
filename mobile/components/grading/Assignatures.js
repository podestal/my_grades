import { Text } from "react-native"
import useAssignatures from "../../hooks/useAssignatures"
import { useQuery } from "@tanstack/react-query"
import { getAssignatures } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import Assignature from "./Assignature"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const Assignatures = () => {

    const {assignatures, setAssignatures} = useAssignatures()
    const { user } = useAuth()
    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignatures({ token: user.access })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

    if (isSuccess) {
        setAssignatures(data.data)
        return (
            <NonScrollableContainer>
                <List 
                    data={assignatures}
                    DetailComponent={Assignature}
                />
            </NonScrollableContainer>
        )
    }
}

// data={activities.data}
// DetailComponent={Assignment}

export default Assignatures