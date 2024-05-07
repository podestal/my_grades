import React from 'react'

const CloseButton = ({ setOpen }) => {
  return (
    <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
  )
}

export default CloseButton