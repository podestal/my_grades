import { useQuery } from "@tanstack/react-query"
import { getStudentsBySchool } from "../api/api"

export const useStudentsQuery = (user) => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudentsBySchool({ token: user.access, schoolId: user.school }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}
