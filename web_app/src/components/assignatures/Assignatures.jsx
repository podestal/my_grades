import Assignature from "./Assignature"
import useAuth from "../../hooks/useAuth"
import { useAllActivitiesQuery } from "../../tanstack/Activities"

const Assignatures = ({ assignatures }) => {

  const {user} = useAuth()
  useAllActivitiesQuery(user, assignatures)


  return (
    <div className='grid grid-cols-4 md:grid-cols-3 mx-auto'>
      {assignatures && assignatures.map( assignature => <Assignature key={assignature.id} assignature={assignature}/>)}
    </div>
  )
}

export default Assignatures