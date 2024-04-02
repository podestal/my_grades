import { Text } from "react-native"
import Title from "../utils/Title"
import Califications from "./Califications"
import { useState } from "react"

const Grade = ({ data: grade }) => {

    const [currentCalification, setCurrentCalification] = useState(grade?.calification)

  return (
    <>
        <Title text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/>
        <Califications 
            grade={grade}
            currentCalification={currentCalification}
            setCurrentCalification={setCurrentCalification}
        />
    </>
  )
}

export default Grade