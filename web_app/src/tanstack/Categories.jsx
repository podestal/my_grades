import { useQuery } from "@tanstack/react-query"

export const useGetCategories = (fxn) => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => fxn,
    })
}