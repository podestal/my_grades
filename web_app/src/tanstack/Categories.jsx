import { useQuery } from "@tanstack/react-query"

export const useGetCategories = (key, fxn) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fxn,
    })
}