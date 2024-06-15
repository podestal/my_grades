import { useAnnouncementsQuery } from "../../tanstack/Announcements"
import Loading from "../../utils/Loading"
import Error from "../../utils/Error"
import useAuth from "../../hooks/useAuth"

const AnnouncementsPage = () => {

    const { user } = useAuth()
    const { data: announcements, isLoading, isError, error} = useAnnouncementsQuery(user)

    if (isLoading) return <Loading />

    if (isError) return <Error error={error}/>

  return (
    <div className="text-white min-h-[100vh] mt-[5rem] w-full relative">
        {console.log('announcements', announcements)}
        <p>AnnouncementsPage</p>
    </div>
  )
}

export default AnnouncementsPage