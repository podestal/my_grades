import { Pressable, Text } from "react-native"
import { getActivities } from "../../api/api"
import { getGradesByStudentAndAssignature } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
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
    const { grades, setGrades } = useGrades()
    const assignatureId = route?.params?.assignature?.id
    const studentId = route?.params?.student?.id
    const filteredGrades = grades.filter(grade => grade.assignature == assignatureId) || []

    const { mutate: getGradesByStudentAndAssignatureMutation, isPending, isError } = useMutation({
        mutationFn: data => getGradesByStudentAndAssignature(data),
        onSuccess: res => setGrades(( prev => ([ ...prev, ...res.data]))),
        onError: err => console.log(err)
    })

    const getter = () => {
        getGradesByStudentAndAssignatureMutation({ token: user.access, assignatureId, studentId })
    }

    useEffect(() => {
        if (filteredGrades.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

  return (
    <NonScrollableContainer>
        {console.log('Grades',grades)}
        <List 
            data={grades.filter(grade => grade.assignature == assignatureId)}
            DetailComponent={TutorActivity}
        />
    </NonScrollableContainer>
  )
}

export default TutorActivities