import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { Text } from "react-native"
import Loading from "../utils/Loading"
import { useEffect } from "react"

const GetCategories = ({ setCategories }) => {

    const { user } = useAuth()
    const { data: categories, isLoading, isError} = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories({ token: user.access })
    })

    if (isLoading) return <Loading />

    useEffect(() => {
        if (categories?.data.length > 0) {
            setCategories(categories.data)
        }
    }, [categories])

}

export default GetCategories