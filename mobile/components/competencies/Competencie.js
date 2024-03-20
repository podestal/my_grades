import { Text } from "react-native"
import Container from "../utils/Container"


const Competencie = ({ data: competencie }) => {
  return (
    <Container>
        <Text>Título: {competencie.title}</Text>
        <Text>Porcentage: {competencie.value}</Text>
    </Container>
  )
}

export default Competencie