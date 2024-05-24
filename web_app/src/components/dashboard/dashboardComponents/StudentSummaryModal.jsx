import { Dialog, DialogPanel, Divider, DonutChart } from "@tremor/react"
import CloseButton from "../../../utils/CloseButton"

const StudentSummaryModal = ({ open, setOpen, setStudentSummary, student, activities }) => {

    const activitiesIds = activities.map( activity => activity.id)
    const gradesObj = {}
    const greadesForDonutChart = []
    let conditionalColors = []
    student.grades
        .filter( grade => activitiesIds.indexOf(grade.activity) >= 0)
        .map( grade => {
            if (grade.calification != 'NA') {
                if (gradesObj[grade.calification]) {
                    gradesObj[grade.calification] += 1
                } else {
                    gradesObj[grade.calification] = 1
                }
            }
        })
    
    for (const [key, value] of Object.entries(gradesObj)) {
        greadesForDonutChart.push({'name': key, value, color: 'red'})
    }

    greadesForDonutChart
    .sort((a ,b) => {
        if (a.name < b.name) {
            return -1
        } 
        if (a.name > b.name) {
            return 1
        }
        return 0
    })
    
    if (greadesForDonutChart[0].name == 'A') {
        conditionalColors = ['yellow-300', 'green-500', 'amber-500', 'red-500']
    } else if (greadesForDonutChart[0].name == 'AD') {
        conditionalColors = ['green-500', 'amber-500', 'red-500']
    } else if (greadesForDonutChart[0].name == 'B') {
        conditionalColors = ['amber-500', 'red-500']
    } else if (greadesForDonutChart[0].name == 'C') {
        conditionalColors = ['red-500']
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
            <DonutChart 
                data={greadesForDonutChart}
                variant="donut"
                showAnimation={true}
                // 'bg-green-500'}
                //                         ${cell.getValue() && cell.getValue().calification == 'A' && cell.getValue().id != 0 && 'bg-yellow-300 text-gray-600'}
                //                         ${cell.getValue() && cell.getValue().calification == 'B' && cell.getValue().id != 0 && 'bg-amber-500'}
                //                         ${cell.getValue() && cell.getValue().calification == 'C' && cell.getValue().id != 0 && 'bg-red-500'}
                //                         ${cell.getValue() && cell.getValue().calification == 'NA' && cell.getValue().id != 0 && 'bg-blue-700'}
                colors={conditionalColors}
            />
        </DialogPanel>
    </Dialog>
  )
}

export default StudentSummaryModal