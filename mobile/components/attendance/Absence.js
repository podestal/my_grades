import { Text } from "react-native"

const Absence = ({ route }) => {
  return (
    <>
        {console.log(route?.params)}
        <Text>Absence</Text>
    </>
  )
}

export default Absence