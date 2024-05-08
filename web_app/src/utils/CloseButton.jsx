import React from 'react'

const CloseButton = ({ handleClose }) => {
  return (
    <button onClick={handleClose} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
  )
}

export default CloseButton