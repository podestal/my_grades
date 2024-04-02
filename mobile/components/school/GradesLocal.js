import { useEffect, useState } from "react"
import useGrades from "../../hooks/useGrades"
import Input from "../utils/Input"
import List from "../utils/List"
import Grade from "./Grade"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const GradesLocal = ({ activityId, name, setName }) => {

    const {grades} = useGrades()
    const [filteredGrades, setFilteredGrades] = useState(grades.filter( grade => grade.activity.id == activityId) || [])

    useEffect(() => {
        setFilteredGrades(grades.filter( grade => grade.activity.id == activityId))
        // console.log('updating', filteredGrades)
    }, [])

  return (
    <>
        <Input
            label={'Buscar...'}
            value={name}
            setter={setName}
            placeholder={'Nombre o Apellido'}
        />
        <List 
            data={filteredGrades.filter( grade => (
                grade?.student?.first_name.toLowerCase().includes(name.toLocaleLowerCase()) ||  
                grade?.student?.last_name.toLowerCase().includes(name.toLocaleLowerCase()))
            )}
            style={{marginBottom: 250}}
            DetailComponent={Grade}
        /> 
    </>
  )
}

export default GradesLocal