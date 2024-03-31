import { Text } from "react-native"
import Select from "../utils/Select"
import { useState } from "react"

const Students = ({ clases }) => {

    const [clase, setClase] = useState('')


  return (
    <>
        {console.log('Clase selected',clase)}
        <Select 
            title={'Clase'}
            setter={setClase}
            data={clases}
        />
    </>
  )
}

export default Students