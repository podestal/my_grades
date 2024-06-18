import { getAnnouncements, updateAnnouncement } from "../api/api"
import { useQuery, useMutation } from "@tanstack/react-query"

export const useAnnouncementsQuery = (user) => {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: () => getAnnouncements({ token: user.access })
    })
}

export const updateAnnouncementMutation = ({ setSuccess, setError, setDisable }) => {
    return useMutation({
        mutationFn: data => updateAnnouncement(data),
        onSuccess: res => {
            setSuccess(true)
            setDisable(true)
            setError(false)
            console.log('response',res)},
        onError: err => {
            setSuccess(false)
            setError(true)
            setDisable(false)
            console.log('error',err)}
    })
}