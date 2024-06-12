import React from 'react'


const Error = ({error}) => {

  return (
    <div className='flex flex-col w-full h-[80vh] font-bold justify-center items-center gap-8'>
      <p className='text-white text-4xl text-center my-0'>Ocurrió un error</p>  
      <p className='text-white text-lg text-center my-0 py-2 '>{error.message}</p>  
    </div>
  )
   
}

export default Error