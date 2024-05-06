import React from 'react'
import GetAssignatures from '../../components/GetAssignatures'
import { styles } from '../../utils/styles'

const Assignatures = () => {
  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>
      <h2 className={`my-12 ${styles.gradientTitle}`}>Cursos</h2>
      <div className='grid grid-cols-4 mx-auto w-[1475px]'>
        <GetAssignatures />
      </div>
      <div className="absolute z-[0] w-[40%] h-[35%] bottom-0 right-0 pink__gradient" />
    </div>
  )
}

export default Assignatures