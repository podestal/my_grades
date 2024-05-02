import { SearchSelect, SearchSelectItem } from "@tremor/react"
import useAuth from "../../hooks/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateGrades } from "../../api/api"
import { useState } from "react"

const CalificationSelector = ({ calification, setCalification, gradeId }) => {

  const [prevCalification, setPrevCalification] = useState(calification && calification || '')
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const { mutate: updateGradesMutation } = useMutation({
    mutationFn: data => updateGrades(data),
    onSuccess: res => {
      queryClient.invalidateQueries(['grades'])  
      setPrevCalification(calification)
    },
    onError: err => setCalification(prevCalification)

  })

  const handleUpdate = () => {
    updateGradesMutation({ token: user.access, gradeId, calification: { calification }  })
  }

  return (
    <SearchSelect className="w-[70px] mx-4" value={calification} 
      onValueChange={ value => {
        setCalification(value)
        handleUpdate()
      }}>
        {console.log('calification from selector', calification)}
        <SearchSelectItem value="AD">AD</SearchSelectItem>
        <SearchSelectItem value="A">A</SearchSelectItem>
        <SearchSelectItem value="B">B</SearchSelectItem>
        <SearchSelectItem value="C">C</SearchSelectItem>
    </SearchSelect>
  )
}

export default CalificationSelector