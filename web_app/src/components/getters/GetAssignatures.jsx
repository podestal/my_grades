import Loading from "../../utils/Loading"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getAssignatures } from "../../api/api"
import { useEffect } from "react"

const GetAssignatures = ({ setAssignatures }) => {

    const { user } = useAuth()
    const { data: assignatures, isLoading } = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignatures({ token: user.access })
    })

    useEffect(() => {
        if (assignatures) {
            setAssignatures(assignatures.data)
        }
    }, [assignatures])

    if (isLoading) return <Loading />

}

export default GetAssignatures