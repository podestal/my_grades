import { useQuery } from "@tanstack/react-query"
import { getGradesByAssignature } from "../api/api"

export const useGradesQuery = (user, assignature) => {
    console.log('assignature from grades query',assignature)
    return useQuery({
        queryKey: [assignature],
        queryFn: () => getGradesByAssignature({ token: user.access, assignatureId: assignature }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}