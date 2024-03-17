import axios from "axios"

const URL = 'http://127.0.0.1:8000/'

export const createUser = (userData) => axios.post(`${URL}auth/users/`, userData)

export const login = (userData) => axios.post(`${URL}auth/jwt/create/`, userData)

export const getUser = (token) => axios.get(`${URL}auth/users/me/`, {
    headers: { Authorization: `JWT ${token}` }
})

export const getAssignatures = token => axios.get(`${URL}api/assignatures/` ,{
    headers: { Authorization: `JWT ${token}` }
})

export const getAssignments = data => axios.get(`${URL}api/assignments/?assignature=${data.assignature}` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const getGrades = data => axios.get(`${URL}api/assignments/${data.assignmentId}/grades/` ,{
    headers: { Authorization: `JWT ${data.token}` }
})