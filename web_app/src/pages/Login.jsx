import React from 'react'
import { useState } from 'react'
import { login, getUser } from '../api/api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// localStorage.setItem('refresh', JSON.stringify(refreshToken))
// localStorage.setItem('access', JSON.stringify(accessToken))
const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const { mutate: getUserMutation } = useMutation({
    mutationFn: data => getUser(data),
    onSuccess: res => {
      setUser( prev => ({ ...prev, ...res.data }))
      navigate('/main')
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
    <form onSubmit={handleSubmit}>
        <input 
          placeholder='Usuario'
          value={username}
          onChange={e => setUsername(e.target.value)}
          type='text'
        />
        <input 
          placeholder='Contraseña'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
        />
        <button type='submit'>Ingresar</button>
    </form>
  )
}

export default Login