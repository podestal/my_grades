import AveragesForm from "./AveragesForm"
import { updateQuarterGrade } from "../../api/api"
import { useMutation } from "@tanstack/react-query"

const UpdateAverage = ({ open, setOpen, student, studentId, calification, setCalification, selectedCompetency, quarter, assignature, averageId }) => {
    
    const { mutate: updateQuarterGradeMutation } = useMutation({
        mutationFn: data => updateQuarterGrade(data),
        onSuccess: res => console.log(res.data),
        onError: err => console.log(err)
    })
  
    return (
    < AveragesForm
        open={open}
        setOpen={setOpen}
        student={student}
        studentId={studentId}
        calification={calification}
        setCalification={setCalification}
        selectedCompetency={selectedCompetency}
        quarter={quarter}
        assignature={assignature}
        update={updateQuarterGradeMutation}
        averageId={averageId}
    />
  )
}

export default UpdateAverage