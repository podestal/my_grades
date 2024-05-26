import { useMutation } from "@tanstack/react-query"
import { createCategory } from "../../api/api"
import CategoryForm from "./CategoryForm"
import ButtonElement from "../utils/Button"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const CreateCategory = ({ setOpen }) => {
    
    const { mutate: createCategoryMutation } = useMutation({
        mutationFn: data => createCategory(data),
        onSuccess: res => console.log(res.data),
        onError: err => console.log(err)
    })

  return (
    <NonScrollableContainer>
        <ButtonElement 
            title={'Volver'}
            onPress={() => setOpen(false)}
        />
        <CategoryForm 
            create={createCategoryMutation}
        /> 
    </NonScrollableContainer>
  )
}

export default CreateCategory