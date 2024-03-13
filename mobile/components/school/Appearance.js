import Container from "../utils/Container"
import { getUser } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useLayoutEffect } from "react"

const Appearance = () => {

    const {user, setUser} = useAuth()

    useLayoutEffect(() => {
        getUser(user.access)
        .then( res => setUser({ ...user, ...res.data }))
        .catch( err => console.log(err))
    }, [])

  return (
    <>
        {console.log(user)}
        <Container title={'Asistencia'}/>
    </>
  )
}

export default Appearance