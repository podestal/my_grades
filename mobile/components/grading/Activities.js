import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { getActivities } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const Activities = ({ route }) => {

    const { user } = useAuth()
    const assignature = route?.params?.assignature

    const {data} = useQuery({
        queryKey: ['activities'],
        queryFn: () => getActivities({token: user.access, assignature:assignature?.id})
    })

    // getActivities({token: user.access, assignature:assignature?.id})

  return (
    <>  
        {data && console.log('activities',data.data)}
        <Text>Activities</Text>
    </>
  )
}

export default Activities