import { Text, View } from "react-native"
import List from "../utils/List"
import useAssignatures from "../../hooks/useAssignatures"
import Clase from "./Clase"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Title from "../utils/Title"

const Clases = () => {

    const {assignatures} = useAssignatures()
    const filteredClases = []
    const filteredAssignatures = []
    assignatures.map( assignature => {
        if (!filteredClases.includes(assignature.clase.title)) {
            filteredClases.push(assignature.clase.title)
            filteredAssignatures.push(assignature)
        }
    })

  return (
    <>
        {assignatures.length > 0 
        ?
        <NonScrollableContainer>
            <List 
                data={filteredAssignatures}
                DetailComponent={Clase} 
            />
        </NonScrollableContainer>
        :
        <View style={{ flex:1, justifyContent: 'center', alignItems:'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 30, padding: 18 }}>Aun no cuentas con ninguna clase</Text>
        </View>
        }
    </>
  )
}

export default Clases