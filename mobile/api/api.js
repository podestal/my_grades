import axios from "axios"

const URL = 'http://127.0.0.1:8000/'
const PROD_URL = ''

// AUTH

export const createUser = (userData) => axios.post(`${URL}auth/users/`, userData)

export const login = (userData) => axios.post(`${URL}auth/jwt/create/`, userData)

export const getUser = (token) => axios.get(`${URL}auth/users/me/`, {
    headers: { Authorization: `JWT ${token}` }
})

// ASSIGNATURES

export const getAssignatures = token => axios.get(`${URL}api/assignatures/` ,{
    headers: { Authorization: `JWT ${token}` }
})

// ASIGNMENTS

export const getAssignments = data => axios.get(`${URL}api/assignments/?assignature=${data.assignature}` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const createAssignment = data => axios.post(`${URL}api/assignments/`, data.assignment ,{
    headers: { Authorization: `JWT ${data.token}` }
})

// GRADES

export const getGrades = data => axios.get(`${URL}api/assignments/${data.assignmentId}/grades/` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const updateGrades = data => axios.patch(`${URL}api/assignments/${data.assignmentId}/grades/${data.gradeId}/`,  data.calification,{
    headers: { Authorization: `JWT ${data.token}` }
})

// COMPETENCIES

export const getCompetencies = data => axios.get(`${URL}api/competences/` ,{
    headers: { Authorization: `JWT ${data.token}` }
})