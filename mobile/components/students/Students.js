import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"

const Students = () => {

    const {user} = useAuth()

  return (
    <>
        {console.log(user)}
        <Text>Students</Text>
    </>
  )
}

export default Students