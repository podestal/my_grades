import { getAnnouncements } from "../api/api"
import { useQuery } from "@tanstack/react-query"

export const useAnnouncementsQuery = (user) => {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: () => getAnnouncements({ token: user.access, userId: user.id })
    })
}