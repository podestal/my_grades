import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"
import Loading from "../../utils/Loading"
import NoContent from "../../utils/NoContent"

const GetCategories = ({ setCategories }) => {

    const { user } = useAuth()

    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories({ token: user.access })
    })

    useEffect(() => {
        if (categories) {
            setCategories(categories.data)
        }
    }, [categories])

    if (isLoading) return <Loading />

}

export default GetCategories