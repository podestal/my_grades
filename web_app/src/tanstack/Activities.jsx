import { useQuery, useQueries } from "@tanstack/react-query"
import { getActivities } from "../api/api"

export const useActivitiesQuery = ( user, assignatureId ) => {
    return useQuery({
        queryKey: ['activities'],
        queryFn: () => getActivities({ token: user.access, assignature: assignatureId }),
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
    })
}

export const useAllActivitiesQuery = (user, assignatures) => {
    return useQueries({
        queries: assignatures.map( assignature => ({
            queryKey: ['activities', assignature.id],
            queryFn: () => getActivities({ token: user.access, assignature: assignature.id })
        }))
    })
}


