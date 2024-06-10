import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import Loading from "../../utils/Loading"
import { getStudents, getStudentsBySchool } from "../../api/api"
import { useEffect } from "react"

const GetStudents = ({ setStudents, assignature, all }) => {

    const { user } = useAuth()
    console.log('all', all)

    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => {
            if (all) {
                return getStudentsBySchool({ token: user.access, schoolId: user.school }) 
            } else {
                return getStudents({ token: user.access, claseId: assignature.clase.id})}
            }

    })

    useEffect(() => {
        if (students) {
            setStudents(students.data)
        }
    }, [students])

    if (isLoading) return <Loading />
}

export default GetStudents