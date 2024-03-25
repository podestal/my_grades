import { Text } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { getDetailGrade } from "../../api/api"
import useAuth from "../../hooks/useAuth"

const Assignature = ({ data: assignature, extraData: student }) => {

    const {user} = useAuth()
    const {data: grades, isLoading, isError, error} = useQuery({
        queryKey: ['detail_grades'],
        queryFn: () => getDetailGrade({ token: user.access, assignatureId: assignature.id, studentId: student.id })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        <Text>{assignature.title}</Text>
        <Text>{assignature.id}</Text>
        {grades && console.log('Grades', grades.data)}
    </>
  )
}

export default Assignature