import { Dialog, DialogPanel, Divider } from "@tremor/react"
import CloseButton from "../../../utils/CloseButton"

const StudentSummaryModal = ({ open, setOpen, setStudentSummary, student, activities }) => {

    const activitiesIds = activities.map( activity => activity.id)
    const gradesObj = {}
    const greadesForDonutChart = []
    student.grades
        .filter( grade => activitiesIds.indexOf(grade.activity) >= 0)
        .map( grade => {
            if (gradesObj[grade.calification]) {
                gradesObj[grade.calification] += 1
            } else {
                gradesObj[grade.calification] = 1
            }
        })
    
        for (const [key, value] of Object.entries(gradesObj)) {
            greadesForDonutChart.push({'name': key, value})
        }

    const handleClosePanel = () => {
        setOpen(false)
        setStudentSummary(false)
    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel className="relative flex flex-col gap-4 items-center">
            {console.log('gradesObj', gradesObj)}
            {console.log('greadesForDonutChart', greadesForDonutChart)}
            <CloseButton handleClose={handleClosePanel}/>
            <h2 className="text-white text-4xl text-center font-poppins">Resumen de Progreso</h2>
            <Divider></Divider>
            <h3 className="text-white text-3xl text-center font-poppins mb-6">{student.first_name} {student.last_name}</h3>
        </DialogPanel>
    </Dialog>
  )
}

export default StudentSummaryModal