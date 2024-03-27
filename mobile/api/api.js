import axios from "axios"

const URL = 'http://127.0.0.1:8000/'
const PROD_URL = ''

// AUTH

export const createUser = (userData) => axios.post(`${URL}auth/users/`, userData)

export const login = (userData) => axios.post(`${URL}auth/jwt/create/`, userData)

export const getUser = (data) => axios.get(`${URL}auth/users/me/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const getProfile = (data) => axios.get(`${URL}api/instructors/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

// ASSIGNATURES

export const getAssignatures = token => axios.get(`${URL}api/assignatures/` ,{
    headers: { Authorization: `JWT ${token}` }
})

// ASIGNMENTS

export const getAssignments = data => axios.get(`${URL}api/activities/?assignature=${data.assignature}` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const createAssignment = data => axios.post(`${URL}api/assignments/`, data.assignment ,{
    headers: { Authorization: `JWT ${data.token}` }
})

// GRADES

export const getGrades = data => axios.get(`${URL}api/assignments/${data.assignmentId}/grades/` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const getDetailGrade = data => axios.get(`${URL}/api/grades/?student=${data.studentId}&assignature=${data.assignatureId}`, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const updateGrades = data => axios.patch(`${URL}api/assignments/${data.assignmentId}/grades/${data.gradeId}/`,  data.calification,{
    headers: { Authorization: `JWT ${data.token}` }
})

// COMPETENCIES

export const getCompetencies = data => axios.get(`${URL}api/competences/` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const createCompetencie = data => axios.post(`${URL}api/competences/`, data.competencie,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const deleteCompetencie = data => axios.delete(`${URL}api/competences/${data.competencieId}/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const updateCompetencie = data => axios.patch(`${URL}api/competences/${data.competencieId}/`, data.updates, {
    headers: { Authorization: `JWT ${data.token}` }
})

//  STUDENTS

export const getStudents = data => axios.get(`${URL}api/students/?clase=${data.claseId}`, {
    headers: { Authorization: `JWT ${data.token}`}
})