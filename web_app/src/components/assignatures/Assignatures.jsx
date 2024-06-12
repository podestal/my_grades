import Assignature from "./Assignature"
import { useQueries } from "@tanstack/react-query"
import { getActivities } from "../../api/api"
import useAuth from "../../hooks/useAuth"

const Assignatures = ({ assignatures }) => {

  const {user} = useAuth()
  const arrayToMap = [1, 2]

  const queryResults = useQueries({
    queries: assignatures.map( assignature => ({
      queryKey: ['activities', assignature.id],
      queryFn: () => getActivities({ token: user.access, assignature: assignature.id })
    }))
  }
    // {
    //   queryKey: ['activities', 1],
    //   queryFn: () => getActivities({ token: user.access, assignature: 1 })
    // },
  )

  return (
    <div className='grid grid-cols-4 md:grid-cols-3 mx-auto'>
      {console.log('assignatures', assignatures)}
      {console.log('queryResults', queryResults)}
      {assignatures && assignatures.map( assignature => <Assignature key={assignature.id} assignature={assignature}/>)}
    </div>
  )
}

export default Assignatures