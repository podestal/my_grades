import { SearchSelect, SearchSelectItem } from "@tremor/react"
import useAuth from "../../hooks/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateGrades } from "../../api/api"
import { useState } from "react"
import { RiCheckLine, RiBugLine } from "@remixicon/react"
import { Badge } from "@tremor/react"

const CalificationSelector = ({ calification, gradeId, setSuccess, setError, setSuccessMsg }) => {

  const [newCalification, setNewCalification] = useState(calification && calification || '')
  // const [success, setSuccess] = useState(false)
  // const [error, setError] = useState(false)
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const { mutate: updateGradesMutation } = useMutation({
    mutationFn: data => updateGrades(data),
    onSuccess: res => {
      console.log('Response:',res.data);
      queryClient.invalidateQueries(['grades'])  
      setSuccess(true)
      setSuccessMsg('Nota cambiada')
      setNewCalification(res.data.calification)
    },
    onError: err => {
      setError(true)
    }

  })

  const handleUpdate = ( value ) => {
    updateGradesMutation({ token: user.access, gradeId, calification: { calification: value }  })
    setTimeout(() => {
      setSuccess(false)
      setError(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col justify-center items-start">
      <SearchSelect className="w-[70px] mx-4" value={newCalification} 
        onValueChange={ value => {
          handleUpdate(value)
        }}>
          <SearchSelectItem value="AD">AD</SearchSelectItem>
          <SearchSelectItem value="A">A</SearchSelectItem>
          <SearchSelectItem value="B">B</SearchSelectItem>
          <SearchSelectItem value="C">C</SearchSelectItem>
      </SearchSelect>
    </div>
  )
}

export default CalificationSelector