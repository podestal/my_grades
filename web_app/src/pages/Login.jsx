import React from 'react'
import { useState } from 'react'
import { login, getUser } from '../api/api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '@tremor/react'
import useAuth from '../hooks/useAuth'

// localStorage.setItem('refresh', JSON.stringify(refreshToken))
// localStorage.setItem('access', JSON.stringify(accessToken))
const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [error ,setError] = useState(false)

  const { mutate: getUserMutation } = useMutation({
    mutationFn: data => getUser(data),
    onSuccess: res => {
      console.log('user', res.data )
      setUser( prev => ({ ...prev, ...res.data }))
      if (res.data.profile == 'I') {
        navigate('/main')
      } else if (res.data.profile == 'P') {
        navigate('/students')
      }
    },
    onError: err => console.log(err)
  })

  const { mutate: loginMutation } = useMutation({
    mutationFn: data => login(data),
    onSuccess: res => {
      setUser( prev => ({ ...prev, ...res.data }))
      getUserMutation({ token: res.data.access })
      localStorage.setItem('access', JSON.stringify(res.data.access))
    },
    onError: err => console.log(err)
  })

  const handleSubmit = e => {
    e.preventDefault()
    loginMutation({ username, password })
  }

  return (
    <div className='bg-primary w-full overflow-hidden h-[100vh] flex items-center justify-center relative'>
        <div className='sm:px-16 px-6 mx-auto flex flex-col justify-center items-center shadow-violet-950 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] md:w-[650px] w-[350px] md:h-[500px] h-[550px]'>
          <h2 className='text-white text-6xl mb-12'>Accede</h2>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-12'>
            <TextInput 
              placeholder='Usuario'
              value={username}
              onChange={e => setUsername(e.target.value)}
              error={error}
              autoComplete={'false'}
            />
            <TextInput 
              placeholder='Contraseña'
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={error}
              type='password'
              autoComplete={'false'}
            />
            <button className='bg-gradient-to-r from-violet-600 to-indigo-950  border-none py-4 px-8 rounded-3xl text-white font-bold text-xl' type='submit'>Ingresar</button>
          </form>
        </div>
        {/* <div className="absolute z-[0] w-[20%] h-[65%] left-0 bottom-0 pink__gradient" /> */}
    </div>
  )
}

export default Login