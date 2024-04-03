import { Pressable, Text } from "react-native"
import { getActivities } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useActivities from "../../hooks/useActivities"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import TutorActivity from "./TutorActivity"

const TutorActivities = ({ route }) => {

    const { user } = useAuth()
    const { activities, setActivities } = useActivities()
    const assignatureId = route?.params?.assignature?.id
    const filteredActivities = activities.filter(activity => activity.assignature == assignatureId) || []

    const { mutate: getActivitiesMutation, isPending, isError } = useMutation({
        mutationFn: data => getActivities(data),
        onSuccess: res => setActivities(( prev => ([ ...prev, ...res.data]))),
        onError: err => console.log(err)
    })

    const getter = () => {
        getActivitiesMutation({ token: user.access, assignature: assignatureId })
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
        {console.log(assignatureId)}
        <List 
            data={activities.filter(activity => activity.assignature == assignatureId)}
            DetailComponent={TutorActivity}
        />
    </NonScrollableContainer>
  )
}

export default TutorActivities