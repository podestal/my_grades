import { useContext } from "react"
import { AnnouncementsContext } from "../context/announcemnts"

const useAnnouncements = () => {
    return useContext(AnnouncementsContext)
}

export default useAnnouncements