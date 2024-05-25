import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { getGradesByAssignature } from "../../api/api"
import Loading from "../../utils/Loading"
import { useEffect } from "react"

const GetGradesByAssignature = ({ assignature, setGrades }) => {

    const { user } = useAuth()
    const { data: gradesByAssignature, isLoading } = useQuery({
        queryKey: ['gradesByAssignature'],
        queryFn: () => getGradesByAssignature({ token: user.access, assignatureId: assignature })
    })

    useEffect(() => {
        if (gradesByAssignature) {
            setGrades(gradesByAssignature.data)
        }
    }, [gradesByAssignature])

    if (isLoading) return <Loading />

}

export default GetGradesByAssignature