import { View } from 'react-native'
import { useEffect, useState } from 'react'
import GradesApi from './GradesApi'
import useGrades from '../../hooks/useGrades'
import GradesLocal from './GradesLocal'

const Grades = ({ route }) => {

    const activityId = route.params.activityId
    const [name, setName] = useState('')
    const { grades } = useGrades()
    const [filteredGrades, setFilteredGrades] = useState(grades.length > 0 ?  grades.filter( grade => grade?.activity?.id == activityId) : [])

    // useEffect(() => {
    //     console.log('Change detected')
    //     const updatedGrades = grades.filter( grade => grade?.activity?.id == activityId)
    //     setFilteredGrades(updatedGrades)
    // }, [grades])

  return (
    <View style={{backgroundColor:'#fff', padding: 10}}> 
        {filteredGrades.length == 0 
        ? 
        <GradesApi 
            activityId={activityId}
            name={name}
            setName={setName}
        />
        :
        <GradesLocal 
            activityId={activityId}
            name={name}
            setName={setName}
        />
        }
        {/* <GradesApi 
            activityId={activityId}
            name={name}
            setName={setName}
        /> */}
    </View>    

  )
}

export default Grades
