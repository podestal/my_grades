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
import { useEffect } from "react"

const Grades = ({ route }) => {

    const activity = route?.params?.activity
    const { user } = useAuth()
    const {grades, setGrades} = useGrades()
    const gradesByActivity = grades.length > 0 && grades?.filter( grade => grade?.activity?.id == activity?.id) || []
    const {mutate: getGradesMutation, isPending, isError} = useMutation({
        mutationFn: data => getGrades(data),
        onSuccess: res => {
            setGrades( prev => ([ ...prev, ...res.data ]))
        },
    })

    const getter = () => {
        getGradesMutation({ token: user.access, activityId: activity.id })
    }

    useEffect(() => {
        if (gradesByActivity.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

  return (
    <NonScrollableContainer>
        <Title text={activity.title}/>
        <NonScrollableContainer>
            <List 
                data={grades?.filter( grade => grade?.activity?.id == activity?.id)}
                DetailComponent={Grade}
            />
        </NonScrollableContainer>
    </NonScrollableContainer>
  )
}

export default Grades
