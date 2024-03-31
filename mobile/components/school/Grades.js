import { View } from 'react-native'
import { useState } from 'react'
import GradesApi from './GradesApi'
import useGrades from '../../hooks/useGrades'
import GradesLocal from './GradesLocal'

const Grades = ({ route }) => {

    const activityId = route.params.activityId
    const [name, setName] = useState('')
    const { grades } = useGrades()
    const filteredGrades = grades.length > 0 ?  grades.filter( grade => grade?.activity?.id == activityId) : []



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
    </View>    

  )
}

export default Grades
