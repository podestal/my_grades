import { Text } from "react-native"

const Category = ({ data:category }) => {
  return (
    <Text>{category.title}</Text>
  )
}

export default Category