import { Text, Pressable } from "react-native"


const Clase = ({ data: assignature }) => {
  return (
    <Text>Clase: {assignature.clase.title}</Text>
  )
}

export default Clase