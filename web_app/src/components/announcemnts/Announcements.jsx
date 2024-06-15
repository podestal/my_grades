import { useClasesQuery } from "../../tanstack/Clases"
import useAuth from "../../hooks/useAuth"
import Loading from "../../utils/Loading"
import Error from "../../utils/Error"
import { useAssignaturesQueryByInstructor } from "../../tanstack/Assignatures"
import Announcement from "./Announcement"
import { getClasesIds, getClasesForInstructors } from "../../data/getClasesForInstructors"

const Announcements = ({ announcements, assignatures, clases }) => {

  const { user } = useAuth()
  const clasesIds = getClasesIds(assignatures)
  const filteredClases = getClasesForInstructors(clases, clasesIds)

  return (
    <div className="w-[95%] flex flex-col gap-8 m-12">
      {/* {console.log('assignatures', assignatures)} */}
        {announcements?.map( announcement => (
            <Announcement 
              key={announcement.id}
              announcement={announcement}
              clases={filteredClases}
            />
        ))}
    </div>
  )
}

export default Announcements