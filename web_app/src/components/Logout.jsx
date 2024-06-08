import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Dialog, DialogPanel } from '@tremor/react'

const Logout = ({ open, setOpen }) => {

    const navigator = useNavigate()
    const { user, setUser } = useAuth()

    const handleLogout = () => {
      console.log('Logged out')
      setOpen(false)
      localStorage.removeItem('access')
      navigator('/')
      setUser({})
    }

  return (
    <>
        <button onClick={() => setOpen(true)} className='px-8 py-3 text-white font-bold text-lg rounded-xl justify-center bg-red-900 hover:bg-red-950 hover:text-slate-200-'>Salir</button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            >
            <DialogPanel 
                className='flex flex-col justify-center items-center gap-12'
            >
                <p className='text-white font-bold text-md'>Está seguro que desea salir</p>
                <div className='flex justify-center gap-8'>
                <button onClick={() => handleLogout()} className='px-8 py-3 text-white font-bold text-lg rounded-xl justify-center bg-red-900 hover:bg-red-950 hover:text-slate-200-'>Salir</button>
                <button onClick={() => setOpen(false)} className='px-8 py-3 text-white font-bold text-lg rounded-xl justify-center bg-blue-800 hover:bg-blue-900 hover:text-slate-200-'>Regresar</button>
                </div>
            </DialogPanel>
        </Dialog>
    </>
  )
}

export default Logout