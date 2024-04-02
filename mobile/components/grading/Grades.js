import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import Title from "../utils/Title"
import { getGrades } from "../../api/api"
import Grade from "./Grade"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const Grades = ({ route }) => {

    const activity = route?.params?.activity
    const { user } = useAuth()
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, activityId: activity.id })
    })

    // getGrades({ token: user.access, activityId })

  return (
    <NonScrollableContainer>
        <Title text={activity.title}/>
        {console.log('Activity from grades:', activity)}
        {data && console.log('grades:', data.data)}
        <NonScrollableContainer>
            <List 
                data={data.data}
                DetailComponent={Grade}
            />
        </NonScrollableContainer>
    </NonScrollableContainer>
  )
}

export default Grades