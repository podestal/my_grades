import React from 'react'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom'

const PersisLogin = ({ children }) => {

    const access = JSON.parse(localStorage.getItem('access')) || ''
    const { user, setUser } = useAuth()
    const navigate = useNavigate()
    const { mutate: getUserMutation } = useMutation({
        mutationFn: data => getUser(data),
        onSuccess: res => {
            setUser( prev => ({ ...prev, ...res.data, access }))
            navigate('/main')
        },
        onError: err => console.log(err)
    })

    useEffect(() => {
        if (!access) {
            navigate('/login')
        }
        if (!user?.access ) {
            const exp = jwtDecode(access).exp
            const isExpired = dayjs.unix(exp).diff(dayjs()) < 1
            if (!isExpired) {
                navigate('/login')
            }
            getUserMutation({ token: access })
        } 
    }, [])

  return (
    <>
        <Outlet />
    </>
  )
}

export default PersisLogin