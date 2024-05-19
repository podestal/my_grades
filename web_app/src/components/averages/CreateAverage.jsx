import { createQuarterGrade } from "../../api/api"
import { useMutation } from "@tanstack/react-query"

const CreateAverage = () => {

  const {mutate: createQuarterGradeMutation} = useMutation({
    mutationFn: data => createQuarterGrade(data),
    onSuccess: res => console.log(res.data),
    onError: err => console.log(err)
  })

  return (
    <div>CreateAverage</div>
  )
}

export default CreateAverage