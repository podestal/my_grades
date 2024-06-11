import { useQuery } from "@tanstack/react-query"
import { getActivities } from "../api/api"

export const useActivitiesQuery = ( user, assignatureId ) => {
    return useQuery({
        queryKey: ['activities'],
        queryFn: () => getActivities({ token: user.access, assignature: assignatureId }),
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
    })
}

