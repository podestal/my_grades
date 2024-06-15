import { useClasesQuery } from "../../tanstack/Clases"
import useAuth from "../../hooks/useAuth"
import Loading from "../../utils/Loading"
import Error from "../../utils/Error"
import { useAssignaturesQueryByInstructor } from "../../tanstack/Assignatures"

const Announcements = ({ announcements, clases }) => {

  const { user } = useAuth()

  return (
    <div>
      {/* {console.log('assignatures', assignatures)} */}
        {announcements?.map( announcement => (
            <p key={announcement.id}>{announcement.title}</p>
        ))}
    </div>
  )
}

export default Announcements