import { useQuery } from "@tanstack/react-query"
import { getClases } from "../api/api"

export const useClasesQuery = (user) => {
    return useQuery({
        queryKey: ['clases'],
        queryFn: () => getClases({ token: user.access, schoolId: user.school }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

