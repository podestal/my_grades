import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Category from "./Category"
import CreateCategory from "./CreateCategory"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../api/api"
import ButtonElement from "../utils/Button"
import { useState } from "react"

const Categories = () => {

    const { user } = useAuth()
    const { data: categories, isLoading, isError} = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories({ token: user.access })
    })

    const [open, setOpen] = useState(false)

  return (
    <> 
        {open 
        ? 
        <CreateCategory 
            setOpen={setOpen}
        /> 
        :
        <NonScrollableContainer>
            <ButtonElement 
                title={'Nueva Categoría'}
                onPress={() => setOpen(true)}
            />
            <List 
                data={categories?.data}
                DetailComponent={Category}
            />
        </NonScrollableContainer>
        }
        

    </>
  )
}

export default Categories