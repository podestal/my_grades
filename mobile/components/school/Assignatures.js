import Container from "../utils/Container"
import { useQuery } from "@tanstack/react-query"
import { getAssignatures } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { FlatList, Text, View } from "react-native"

const Assignature = ({ assignature }) => {

    return (
        <View>
            {/* <Text>{title}</Text>
            <Text>{clase}</Text> */}
            {console.log(assignature)}
            <Text>{assignature.title}</Text>
            <Text>{assignature.clase.title}</Text>
        </View>
    )

}

const Assignatures = () => {

    const {user} = useAuth()

    const { data: assignatures } = useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignatures(user.access)
    })

  return (
    <>
        {assignatures && <FlatList 
            data={assignatures.data}
            keyExtractor={ item => item.id}
            renderItem={ itemData => <Assignature assignature={itemData.item} />}
        />}
    </>
  )
}

export default Assignatures

// data={expenses}
// renderItem={(itemData) => (
//   <ExpenseItem
//     expense={itemData.item}
//   />
// )}
// keyExtractor={(item) => item.id}