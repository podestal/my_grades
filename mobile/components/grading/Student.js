import { Text } from "react-native"

const Student = ({ data: student }) => {
  return (
    <>
        <Text>{student.first_name} {student.last_name}</Text>
    </>
  )
}

export default Student