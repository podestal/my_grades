import { Dialog, DialogPanel, Divider, DonutChart, Legend, BadgeDelta } from "@tremor/react"
import CloseButton from "../../../utils/CloseButton"
import useStudent from "../../../hooks/useStudents"


const StudentSummaryModal = ({ open, setOpen, student, setStudentSummary, activities }) => {

    const colorsDictionary = {
        'A': 'yellow-300',
        'AD': 'green-500',
        'B': 'amber-500',
        'C': 'red-500',
    }
    const activitiesIds = activities.map( activity => activity.id)
    const gradesObj = {}
    const greadesForDonutChart = []
    const conditionalColors = []
    const legendCategories = []
    let activitiesCount = 0
    student?.grades
        .filter( grade => activitiesIds.indexOf(grade.activity) >= 0)
        .map( grade => {
            if (grade.calification != 'NA') {
                activitiesCount++
                if (gradesObj[grade.calification]) {
                    gradesObj[grade.calification] += 1
                } else {
                    gradesObj[grade.calification] = 1
                }
            }
        })
    
    for (const [key, value] of Object.entries(gradesObj)) {
        greadesForDonutChart.push({'name': key, value, color: colorsDictionary[key]})
    
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
    .map( grade => {
        legendCategories.push(`${grade.name}: ${grade.value}`)
        conditionalColors.push(grade.color)
    })

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
            <CloseButton handleClose={handleClosePanel}/>
            <h2 className="text-white text-4xl text-center font-poppins">Resumen de Progreso</h2>
            <Divider></Divider>
            <div className="flex w-full justify-center gap-4 items-center mb-6">
                <h3 className="text-white text-3xl text-center font-poppins">{student.first_name} {student.last_name}</h3>
                <BadgeDelta deltaType='increase' isIncreasePositive={true}></BadgeDelta>
            </div>
            <div className="flex justify-between gap-6 w-full">
                <div className="w-[65%]">
                    <DonutChart 
                        data={greadesForDonutChart}
                        variant="donut"
                        showAnimation={true}
                        label={activitiesCount > 1 ? `${activitiesCount} actividades` : `${activitiesCount} actividad`}
                        showLabel={true}
                        colors={conditionalColors}
                    />
                    <Legend
                        categories={legendCategories}
                        colors={conditionalColors}
                        className="mt-4 w-full flex justify-center"
                    />
                </div>
                <div className="flex items-start justify-between w-[35%] my-4 mx-4 gap-6 text-white">
                    <div className="flex flex-col gap-6">
                        <p>Faltas:</p>
                        <p>Tardanzas:</p>
                        <p>Participaciones:</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <p>2</p>
                        <p>2</p>
                        <p>2</p>
                    </div>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
  )
}

export default StudentSummaryModal