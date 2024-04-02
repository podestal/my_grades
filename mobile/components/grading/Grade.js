import { Text } from "react-native"
import Title from "../utils/Title"

const Grade = ({ data: grade }) => {
  return (
    <>
        <Title text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/>
        <Text>{grade?.calification}</Text>
    </>
  )
}

export default Grade