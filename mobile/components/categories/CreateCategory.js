import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "../../api/api"
import CategoryForm from "./CategoryForm"
import ButtonElement from "../utils/Button"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import { useState } from "react"
import { Text } from "react-native"

const CreateCategory = () => {

    // HANDLING ERRORS
    const [disable, setDisable] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    
    const queryClient = useQueryClient()
    const { mutate: createCategoryMutation } = useMutation({
        mutationFn: data => createCategory(data),
        onSuccess: res => {
            queryClient.invalidateQueries(['categories'])
            setDisable(true)
            setSuccess(true)
            setError(false)
            console.log(res.data)},
        onError: err => {
            setSuccess(false)
            setError(true)
            setDisable(false)
            console.log(err)}
    })

  return (
    <CategoryForm 
        create={createCategoryMutation}
        disable={disable}
        success={success}
        error={error}
    /> 
  )
}

export default CreateCategory