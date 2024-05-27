import { Text } from "react-native"
import CategoryForm from "./CategoryForm"
import { useState } from "react"

const UpdateCategory = ({ route }) => {

    // HANDLING ERRORS
    const [disable, setDisable] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const category = route?.params?.category
  return (
    <CategoryForm 
        category={category}
        disable={disable}
        success={success}
        error={error}
    />
  )
}

export default UpdateCategory