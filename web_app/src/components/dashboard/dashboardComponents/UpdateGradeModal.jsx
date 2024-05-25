import { DialogPanel, Select, SelectItem, Button ,Dialog, Divider } from "@tremor/react"
import { updateGrades } from "../../../api/api"
import { useMutation, useQueryClient, useQueries } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import { useState } from "react"
import InputText from "../../../utils/InputText"
import useStudent from "../../../hooks/useStudents"


const UpdateGradeModal = ({ activity, student, setOpen, open, calification, setCalification, gradeId, forceConclusions, error, setError, createAverage, studentId }) => {

    const { user } = useAuth()
    const {students, setStudents} = useStudent()
    const [observations, setObservations] = useState('')
    const queryClient = useQueryClient()
    const { mutate: updateGradesMutation } = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            queryClient.invalidateQueries(['students'])
            setOpen(false)
            const studentFound = students.find( localStudent => localStudent.id == studentId)
            studentFound.grades = studentFound.grades.map( singleGrade => {
                if (singleGrade.id == gradeId) {
                    singleGrade = res.data
                }
                return singleGrade
            })
            setStudents( prevStudents => prevStudents.map( localStudent => {
                if (localStudent.id == studentFound.id) {
                    localStudent = studentFound
                }
                return localStudent
            }))
        },
            // const studentFound = students.find( localStudent => localStudent.id == student.id)
            // studentFound.grades = studentFound.grades.map( singleGrade => {
            //     if (singleGrade.id == gradeId) {
            //         singleGrade = res.data
            //     }
            //     return singleGrade
            // })
            // setStudents( students => students.map( localStudent => {
            //     if (localStudent.id == student.id) {
            //         localStudent = studentFound
            //     }
            //     return localStudent
            // }))
        onError: err => console.log('Error',err)
    })

    const handleUpdate = () => {
        setError(false)
        if (forceConclusions && observations == '' && calification == 'C') {
            setError(true)
            return
        }
        updateGradesMutation({ token: user.access, gradeId, calification: { calification } })
    }

//     <CategoryForm 
//     open={open}
//     setOpen={setOpen}
//     success={success}
//     error={error}
//     titleError={titleError}
//     weightError={weightError}
//     create={createCategoryMutation}
// />

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogPanel className="relative flex flex-col gap-4 items-center">
            {console.log('student modify grade', student)}
            <h2 className="text-white text-3xl text-center">{activity}</h2>
            <h3 className="text-white text-xl text-center">{student}</h3>
            <Divider></Divider>
            <p className="text-white font-poppins ml-4 text-lg text-center">Calificación</p>
            <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
            <div className="flex flex-col gap-4 w-[270px]">
                <Select value={calification} onValueChange={ value => setCalification(value)}>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="AD">AD</SelectItem>
                </Select>
            </div>
            <InputText 
                value={observations}
                setter={setObservations}
                label={forceConclusions ? 'Conclusiones Descriptivas' : 'Observaciones'}
                error={error}
                errorMsg={'Conclusiones descriptivas son obligatorias para las notas C'}
                textArea={true}
                placeholder={'Conclusiones descriptivas'}
            />
            <div className="flex items-center justify-center my-4">
                <Button onClick={handleUpdate} className="" variant="secondary">Cambiar</Button>
            </div>
        </DialogPanel>
    </Dialog>
  )
}

export default UpdateGradeModal