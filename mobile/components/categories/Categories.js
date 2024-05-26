import { Text } from "react-native"
import GetCategories from "../getters/GetCategories"
import useCategories from "../../hooks/useCategories"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Category from "./Category"

const Categories = () => {

    const {categories, setCategories} = useCategories()

  return (
    <>
        {categories.length == 0 
        ? 
        <GetCategories 
            setCategories={setCategories}
        />
        : 
        <NonScrollableContainer>
            <List 
                data={categories}
                DetailComponent={Category}
            />
        </NonScrollableContainer>
        }
        {/*                 <List 
                    data={activities?.filter(activity => activity.assignature == assignature.id)}
                    DetailComponent={Activity}
                /> */}
    </>
  )
}

export default Categories