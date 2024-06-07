import { Pressable, Text } from "react-native"
import { getActivities } from "../../api/api"
import { getGradesByStudentAndAssignature } from "../../api/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useGrades from "../../hooks/useGrades"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import TutorActivity from "./TutorActivity"

const TutorActivities = ({ route }) => {

    const { user } = useAuth()
    // const { grades, setGrades } = useGrades()
    const assignatureId = route?.params?.assignature?.id
    const studentId = route?.params?.student?.id
    // const filteredGrades = grades.filter(grade => grade.assignature == assignatureId && grade.student.id == studentId) || []
    const queryClient = useQueryClient()
    const tutor = queryClient.getQueryData(['tutor'])
    const assignatures = queryClient.getQueryData(['assignatures'])

    // const { mutate: getGradesByStudentAndAssignatureMutation, isPending, isError } = useMutation({
    //     mutationFn: data => getGradesByStudentAndAssignature(data),
    //     onSuccess: res => setGrades(( prev => ([ ...prev, ...res.data]))),
    //     onError: err => console.log(err)
    // })

    const { data: grades, isLoading, isError } = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGradesByStudentAndAssignature({ token: user.access, assignatureId, studentId })
    })

    // const getter = () => {
    //     getGradesByStudentAndAssignatureMutation({ token: user.access, assignatureId, studentId })
    // }

    // useEffect(() => {
    //     if (filteredGrades.length == 0) {
    //         getter()
    //     }
    // }, [])

    if (isLoading) return <Loading />

    if (isError) return <Error/>

  return (
    <NonScrollableContainer>
        {/* {console.log('Student from activities',route?.params?.student.id)} */}
        {/* {console.log('assignatures from cache', assignatures?.data)} */}
        <List 
            data={grades?.data.filter(grade => grade.assignature == assignatureId && grade.student.id == studentId)}
            DetailComponent={TutorActivity}
        />
    </NonScrollableContainer>
  )
}

export default TutorActivities