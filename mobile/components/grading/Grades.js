import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { useQuery, useMutation } from "@tanstack/react-query"
import Title from "../utils/Title"
import useGrades from "../../hooks/useGrades"
import { getGrades } from "../../api/api"
import Grade from "./Grade"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Loading from "../utils/Loading"
import Error from "../utils/Error"

const Grades = ({ route }) => {

    const activity = route?.params?.activity
    const { user } = useAuth()

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, activityId: activity.id })
    })

    if (isLoading) return <Loading />

    if (isError) return <Error retry={refetch}/>

  return (
    <NonScrollableContainer>
        <Title text={activity.title}/>
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
