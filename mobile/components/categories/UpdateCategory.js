import { Text } from "react-native"
import CategoryForm from "./CategoryForm"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCategory } from "../../api/api"

const UpdateCategory = ({ route }) => {

    // HANDLING ERRORS
    const [disable, setDisable] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    // QUERY CLIENT
    const queryClient = useQueryClient()

    // UPDATE MUTATION
    const { mutate: updateCategoryMutation } = useMutation({
        mutationFn: data => updateCategory(data),
        onSuccess: res => {
            console.log(res.data)
            queryClient.invalidateQueries(['categories'])
            setDisable(true)
            setSuccess(true)
            setError(false)
        },
        onError: err => {
            console.log(err)
            setDisable(false)
            setSuccess(false)
            setError(true)
        }
    })

    const category = route?.params?.category
  return (
    <CategoryForm 
        category={category}
        disable={disable}
        success={success}
        error={error}
        update={updateCategoryMutation}
    />
  )
}

export default UpdateCategory