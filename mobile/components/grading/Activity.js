import { Text } from "react-native"

const Activity = ({ data:activity }) => {
  return (
    <Text>{activity?.title}</Text>
  )
}

export default Activity