import useAnnouncements from "../../hooks/useAnnouncements"

const AnnouncemntsMain = () => {

    const {announcements} = useAnnouncements()

  return (
    <div>
        {announcements.map( announcement => (
            <p key={announcement.id}>{announcement.title}</p>
        ))}
    </div>
  )
}

export default AnnouncemntsMain