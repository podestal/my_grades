import { createContext, useState } from "react"

export const AnnouncementsContext = createContext()

const AnnouncementsContextProvider = ({ children }) => {

    const [ announcements, setAnnouncements ] = useState([])

    return (
        <AnnouncementsContext.Provider value={{ announcements, setAnnouncements }}>
            { children }
        </AnnouncementsContext.Provider>
    )
}

export default AnnouncementsContextProvider