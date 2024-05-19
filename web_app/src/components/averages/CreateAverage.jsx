import { createQuarterGrade } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import AveragesForm from "./AveragesForm"

const CreateAverage = ({ open, setOpen, student, studentId, calification, setCalification, selectedCompetency, quarter, assignature }) => {

  const {mutate: createQuarterGradeMutation} = useMutation({
    mutationFn: data => createQuarterGrade(data),
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
      create={createQuarterGradeMutation}
  />
  )
}

export default CreateAverage