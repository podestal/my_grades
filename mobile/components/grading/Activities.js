import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { getActivities } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import useActivities from "../../hooks/useActivities"
import List from "../utils/List"
import Activity from "./Activity"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Loading from "../utils/Loading"

const Activities = ({ route }) => {

    const { user } = useAuth()
    const assignature = route?.params?.assignature
    const { activities, setActivities } = useActivities()

    const {data, isLoading, isError, isSuccess, error} = useQuery({
        queryKey: ['grades'],
        queryFn: () => getActivities({token: user.access, assignature:assignature?.id})
    })

    if (isLoading) return <Loading />

    if (isError) return <Text>{error.message}</Text>

    return (
        <NonScrollableContainer>  
            <NonScrollableContainer>
                <List 
                    data={data.data}
                    DetailComponent={Activity}
                />
            </NonScrollableContainer>
        </NonScrollableContainer>
    )


}

export default Activities