import { SearchSelect, SearchSelectItem } from "@tremor/react"
import useAuth from "../../hooks/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateGrades } from "../../api/api"
import { useState } from "react"
import { RiCheckLine, RiBugLine } from "@remixicon/react"
import { Badge } from "@tremor/react"

const CalificationSelector = ({ calification, setCalification, gradeId, setSuccess, setError, setSuccessMsg }) => {

  const [prevCalification, setPrevCalification] = useState(calification && calification || '')
  // const [success, setSuccess] = useState(false)
  // const [error, setError] = useState(false)
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const { mutate: updateGradesMutation } = useMutation({
    mutationFn: data => updateGrades(data),
    onSuccess: res => {
      queryClient.invalidateQueries(['grades'])  
      setPrevCalification(calification)
      setSuccess(true)
      setSuccessMsg('Nota cambiada')
    },
    onError: err => {
      setCalification(prevCalification)
      setError(true)
    }

  })

  const handleUpdate = () => {
    updateGradesMutation({ token: user.access, gradeId, calification: { calification }  })
    setTimeout(() => {
      setSuccess(false)
      setError(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col justify-center items-start">
      <SearchSelect className="w-[70px] mx-4" value={calification} 
        onValueChange={ value => {
          setCalification(value)
          handleUpdate()
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