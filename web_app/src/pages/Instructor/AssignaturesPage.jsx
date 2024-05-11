import React from 'react'
import GetAssignatures from '../../components/getters/GetAssignatures'
import Assignatures from '../../components/assignatures/Assignatures'
import { styles } from '../../utils/styles'
import useAssignatures from '../../hooks/useAssignatures'

const AssignaturesPage = () => {

  const {assignatures, setAssignatures} = useAssignatures()

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>
      <h2 className={`my-12 ${styles.gradientTitle}`}>Cursos</h2>
      {assignatures.length == 0 
      ? 
      <GetAssignatures 
        setAssignatures={setAssignatures}
      /> : 
      <Assignatures 
        assignatures={assignatures}
      />}
      {/* <h2 className={`my-12 ${styles.gradientTitle}`}>Cursos</h2>
      <div className='grid grid-cols-4 mx-auto w-[1475px]'>
        <GetAssignatures />
      </div>
      <div className="absolute z-[0] w-[40%] h-[35%] bottom-0 right-0 pink__gradient" /> */}
    </div>
  )
}

export default AssignaturesPage