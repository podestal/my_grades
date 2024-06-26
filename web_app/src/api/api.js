import axios from 'axios'

const URL = 'http://127.0.0.1:8000/'
// const URL = 'https://m-grades-api.vercel.app/'
const PROD_URL = ''

export const API_URL = 'http://127.0.0.1:8000/'

// AUTH

export const createUser = (userData) => axios.post(`${URL}auth/users/`, userData)

export const login = (userData) => axios.post(`${URL}auth/jwt/create/`, userData)

export const getUser = (data) => axios.get(`${URL}auth/users/me/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const getProfile = (data) => axios.get(`${URL}api/instructors/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const getInstructor = (data) => axios.get(`${URL}api/instructors/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

// ASSIGNATURES

export const getAssignatures = data => axios.get(`${URL}api/assignatures/?clase=&Instructor=${data.instructorId}&school=` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const getAssignaturesByInstructor = data => axios.get(`${URL}api/assignatures/?clase=&Instructor=${data.instructorId}&school=` ,{
    headers: { Authorization: `JWT ${data.token}` }
})
.then(res => res.data)

export const getAssignaturesByClase = data => axios.get(`${URL}api/tutorAssignatures/?clase=${data.claseId}`, {
    headers: { Authorization: `JWY ${data.access}` }
})

export const getAssignaturesBySchool = data => axios.get(`${URL}api/assignatures/?clase=&Instructor=&school=${data.schoolId}`, {
    headers: { Authorization: `JWY ${data.access}` }
})
.then(res => res.data)

// ACTIVITIES

export const getActivities = data => axios.get(`${URL}api/activities/?assignature=${data.assignature}` ,{
    headers: { Authorization: `JWT ${data.token}` }
})
.then(res => res.data)

export const getAllActivities = data => axios.get(`${URL}api/activities/` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const createActivity = data => axios.post(`${URL}api/activities/`, data.activity ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const updateActivity = data => axios.patch(`${URL}api/activities/${data.activityId}/`, data.updates, {
    headers: { Authorization: `JWT ${data.token}`}
})

// CATEGORIES

export const getCategories = data => axios.get(`${URL}api/categories/`, {
    headers: { Authorization: `JWT ${data.token}`}
})
.then(res => res.data)

export const createCategory = data => axios.post(`${URL}api/categories/`, data.category, {
    headers: { Authorization: `JWT ${data.token}` }
})
.then(res => res.data)

export const updateCategory = data => axios.patch(`${URL}api/categories/${data.categoryId}/`, data.updates, {
    headers: { Authorization: `JWT ${data.token}`}
})
.then(res => res.data)

export const deleteCategory = data => axios.delete(`${URL}api/categories/${data.categoryId}/`, {
    headers: { Authorization: `JWT ${data.token}`}
})
.then(res => res.data)

// GRADES

//// /api/grades/?student=&activity=7&assignature=

export const getGrades = data => axios.get(`${URL}api/grades/?student=&activity=${data.activityId}&assignature=` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const getGradesByStudentAndAssignature = data => axios.get(`${URL}api/grades/?student=${data.studentId}&assignature=${data.assignatureId}&activity=` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const getGradesByAssignature = data => axios.get(`${URL}api/grades/?student=&assignature=${data.assignatureId}&activity=` ,{
    headers: { Authorization: `JWT ${data.token}` }
})

export const getDetailGrade = data => axios.get(`${URL}/api/grades/?student=${data.studentId}&assignature=${data.assignatureId}`, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const updateGrades = data => axios.patch(`${URL}api/grades/${data.gradeId}/`,  data.calification,{
    headers: { Authorization: `JWT ${data.token}` }
})

// CAPACITIES

export const getCapacities = data => axios.get(`${URL}api/capacities/?competence=${data.filter}`)

// COMPETENCIES

export const getCompetencies = data => axios.get(`${URL}api/competences/?area=${data.filter}`)

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

export const getStudentsBySchool = data => axios.get(`${URL}api/students/?clase=&school=${data.schoolId}`, {
    headers: { Authorization: `JWT ${data.token}`}
})

// CLASES

export const getClases = data => axios.get(`${URL}api/clases/?school=${data.schoolId}` , {
    headers: { Authorization: `JWT ${data.token}` }
})

// ATTENDANCE

export const createAttendance = data => axios.post(`${URL}api/atendances/`, data.attendance, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const removeAttendance = data => axios.delete(`${URL}api/atendances/${data.attendanceId}/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

// TUTOR

export const getTutor = data => axios.get(`${URL}api/tutors/me/`, {
    headers: { Authorization: `JWT ${data.token}` }
})

// PARTICIPATIONS

export const createParticipation = data => axios.post(`${URL}api/participations/`, data.participation, {
    headers: { Authorization: `JWT ${data.token}` }
})

export const updateParticipation = data => axios.patch(`${URL}api/participations/${data.participationId}/`, data.updates, {
    headers: { Authorization: `JWT ${data.token}` }
})

// ANNOUNCEMENTS

export const getAnnouncements = data => axios.get(`${URL}api/annunciations/?ordering=-created_at`, {
    headers: { Authorization: `JWT ${data.token}` }
})
.then(res => res.data)

export const createAnnouncement = data => axios.post(`${URL}api/annunciations/`, data.announcement, {
    headers: { Authorization: `JWT ${data.token}`}
})
.then(res => res.data)

export const updateAnnouncement = data => axios.patch(`${URL}api/annunciations/${data.announcementId}/`, data.updates, {
    headers: { Authorization: `JWT ${data.token}`}
})
.then(res => res.data)

// ANNOUNCEMENTS IMGS

export const createAnnouncementImg = async data => axios.post(`${URL}api/annunciations/${data.announcementId}/images/`, data.announcementImg, {
    headers: { Authorization: `JWT ${data.token}`, "Content-Type": 'multipart/form-data'}
})

// export const createOrderReceipt = async data => baseAxios.post(`${ORDERS}${data.orderId}/receipts/`, data.image, {
//     headers: { Authorization: `JWT ${data.access}`}
// })
// .then(res => res.data)

// QUARTER GRADE

export const createQuarterGrade = data => axios.post(`${URL}api/averages/`, data.quarterGrade, {
    headers: { Authorization: `JWT ${data.token}`}
})

export const getQuarterGrades = data => axios.get(`${URL}api/averages/?assignature=${data.assignatureId}&quarter=`, {
    headers: { Authorization: `JWT ${data.token}`}
})

export const updateQuarterGrade = data => axios.patch(`${URL}api/averages/${data.averageId}/`, data.updates, {
    headers: { Authorization: `JWT ${data.token}`}
})
