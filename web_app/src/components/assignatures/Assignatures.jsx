import Assignature from "./Assignature"

const Assignatures = ({ assignatures }) => {
  return (
    <div className='grid grid-cols-4 md:grid-cols-3 mx-auto w-[1475px]'>
        {assignatures && assignatures.map( assignature => <Assignature key={assignature.id} assignature={assignature}/>)}
    </div>
  )
}

export default Assignatures