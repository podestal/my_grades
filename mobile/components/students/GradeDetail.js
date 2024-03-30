import { Text } from "react-native"
import { getDetailGrade } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import List from "../utils/List"
import GradeAssignments from "./GradeAssignments"

const GradeDetail = ({ studentId, assignatureId }) => {

    const { user } = useAuth()
    const {data: grades, isLoading, isError, error} = useQuery({
        queryKey: ['detail_grades'],
        queryFn: () => getDetailGrade({ token: user.access, assignatureId, studentId })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        <List 
            data={grades.data}
            DetailComponent={GradeAssignments}
        />
    </>
  )
}

export default GradeDetail