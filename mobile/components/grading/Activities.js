import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { getActivities } from "../../api/api"
import { useQuery, useMutation } from "@tanstack/react-query"
import useActivities from "../../hooks/useActivities"
import List from "../utils/List"
import Activity from "./Activity"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Loading from "../utils/Loading"
import { useEffect, useState } from "react"
import ButtonElement from "../utils/Button"
import { useNavigation } from "@react-navigation/native"
import useGrades from "../../hooks/useGrades"

const Activities = ({ route }) => {

    const { user } = useAuth()
    const assignature = route?.params?.assignature
    const { activities, setActivities } = useActivities()
    const navigator = useNavigation()
    const [filteredActivities, setFilteredActivities] = useState(activities.filter(activity => activity.assignature == assignature.id) || [])

    const {mutate: getActivitiesMutation, isPending, isError} = useMutation({
        mutationFn: (data) => getActivities(data),
        onSuccess: res => {
            setActivities(( prev => ([ ...prev, ...res.data ]) ))
        }
    })

    const getter = () => {
        getActivitiesMutation({token: user.access, assignature:assignature?.id})
    }

    useEffect(() => {
        if (filteredActivities.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

    return (
        <NonScrollableContainer>  
            <ButtonElement 
                title={'Crear'}
                onPress={() => navigator.navigate('ActivityCreate', {
                    assignature,
                })}
            />
            <NonScrollableContainer>
                <List 
                    data={activities?.
                        filter(activity => activity.assignature == assignature.id)}
                    DetailComponent={Activity}
                />
            </NonScrollableContainer>
        </NonScrollableContainer>
    )


}

export default Activities