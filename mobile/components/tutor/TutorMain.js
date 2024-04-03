import { Text } from "react-native"
import { useMutation } from "@tanstack/react-query"
import { getTutor } from "../../api/api"
import useTutor from "../../hooks/useTutor"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import StudentSummary from "./StudentSummary"
import Title from "../utils/Title"

const TutorMain = () => {

    const {tutor, setTutor} = useTutor()
    const { user } = useAuth()

    const {mutate: getTutorMutation, isPending, isError} = useMutation({
        mutationFn: data => getTutor(data),
        onSuccess: res => setTutor(res.data),
        onError: err => console.log(err)
    })

    const getter = () => {
        getTutorMutation({ token: user.access })
    }

    useEffect(() => {
        if (!tutor.id) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter} />

  return (
    <NonScrollableContainer>  
        <Title 
            text={'Alumnos'}
        />
        <NonScrollableContainer>
            <List 
                data={tutor?.students}
                DetailComponent={StudentSummary}
                extraData={tutor?.clase}
            />
        </NonScrollableContainer>
    </NonScrollableContainer>
  )
}

export default TutorMain