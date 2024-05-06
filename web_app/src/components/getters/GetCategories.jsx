import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"

const GetCategories = ({ setCategories }) => {

    const { user } = useAuth()
    const [save, setSave] = useState(false)

    const { data: categories, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories({ token: user.access })
    })

    useEffect(() => {
        if (categories) {
            setCategories(categories.data)
        }
    }, [categories])

}

export default GetCategories