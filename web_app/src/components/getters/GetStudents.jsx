import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import Loading from "../../utils/Loading"
import { getStudents } from "../../api/api"
import { useEffect } from "react"

const GetStudents = ({ setStudents, assignature }) => {

    const { user } = useAuth()

    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents({ token: user.access, claseId: assignature.clase.id})
    })

    useEffect(() => {
        if (students) {
            setStudents(students.data)
        }
    }, [students])

    if (isLoading) return <Loading />
}

export default GetStudents