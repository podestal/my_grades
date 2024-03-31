import { Text } from "react-native"
import useGrades from "../../hooks/useGrades"
import { useEffect } from "react"

const GradesLocal = ({ grades }) => {

    const {setGrades} = useGrades()

    useEffect(() => {
        setGrades( prev => ([ ...prev, ...grades ]))

    }, [])

  return (
    <></>
  )
}

export default GradesLocal