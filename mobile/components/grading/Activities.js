import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { getActivities } from "../../api/api"
import { useQuery, useMutation } from "@tanstack/react-query"
import useActivities from "../../hooks/useActivities"
import List from "../utils/List"
import Activity from "./Activity"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Loading from "../utils/Loading"
import { useEffect } from "react"

const Activities = ({ route }) => {

    const { user } = useAuth()
    const assignature = route?.params?.assignature
    const { activities, setActivities } = useActivities()

    const {mutate: getActivitiesMutation, isPending, isError} = useMutation({
        mutationFn: (data) => getActivities(data),
        onSuccess: res => setActivities(res.data)
    })

    const getter = () => {
        getActivitiesMutation({token: user.access, assignature:assignature?.id})
    }

    useEffect(() => {
        if (activities.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

    return (
        <NonScrollableContainer>  
            <NonScrollableContainer>
                <List 
                    data={activities}
                    DetailComponent={Activity}
                />
            </NonScrollableContainer>
        </NonScrollableContainer>
    )


}

export default Activities