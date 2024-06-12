import { useQuery } from "@tanstack/react-query";
import { getAssignaturesBySchool, getAssignaturesByInstructor } from "../api/api";

export const useAssignaturesQuery = (user) => {

    return useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignaturesBySchool({ token: user.access, schoolId: user.school }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const useAssignaturesQueryByInstructor = (user) => {
    return useQuery({
        queryKey: ['assignaturesByInstructor'],
        queryFn: () => getAssignaturesByInstructor({ token: user.access, instructorId: user.instructor.id }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}