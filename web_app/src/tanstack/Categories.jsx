import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getCategories, createCategory } from "../api/api"



export const useCategoriesQuery = (user) => {
    return  useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories({ token: user.access }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const useCategorieCreateMutation = () => {

    const queryClient = useQueryClient()
    console.log(queryClient.getQueryData(['categories']))
    return useMutation({
        mutationFn: data => createCategory(data),
        onSuccess: res => {
            console.log(res.data)
            queryClient.setQueryData(['categories'], prev => ({ ...prev, ...res.data}))
        },
        onError: err => {
            console.log(err);
        }
    })
}