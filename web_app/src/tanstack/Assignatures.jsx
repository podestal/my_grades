import { useQuery } from "@tanstack/react-query";
import { getAssignaturesBySchool } from "../api/api";

export const useAssignaturesQuery = (user) => {

    return useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignaturesBySchool({ token: user.access, schoolId: user.school }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}