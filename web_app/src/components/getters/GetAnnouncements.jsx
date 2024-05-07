import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getAnnouncements } from "../../api/api"
import Loading from "../../utils/Loading"
import { useEffect } from "react"

const GetAnnouncements = ({ setAnnouncements }) => {

    const { user } = useAuth()
    const { data: announcements, isLoading, isError, error } = useQuery({
        queryKey: ['announcements'],
        queryFn: () => getAnnouncements({ token: user.access })
    })

    useEffect(() => {
        if (announcements) {
            setAnnouncements(announcements.data)
        }
    }, [announcements])

    if (isLoading) return <Loading />

}

export default GetAnnouncements