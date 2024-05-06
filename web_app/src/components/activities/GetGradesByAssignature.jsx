import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getGradesByAssignature } from "../../api/api"
import Loading from "../../utils/Loading"
import GetActivities from "./GetActivities"
import useGrades from "../../hooks/useGrades"

const GetGradesByAssignature = ({ assignature, quarter }) => {

    const { user } = useAuth()
    const { setGrades } = useGrades()
    const { data: gradesByAssignature, isLoading, isSuccess } = useQuery({
        queryKey: ['gradesByAssignature'],
        queryFn: () => getGradesByAssignature({ token: user.access, assignatureId:assignature })
    })

    if (isLoading) return <Loading />

    if (isSuccess) {
        setGrades(gradesByAssignature.data)
    }

  return (
    <GetActivities 
        gradesByAssignature={gradesByAssignature.data}
        assignature={assignature}
        quarter={quarter}
    />
  )
}

export default GetGradesByAssignature