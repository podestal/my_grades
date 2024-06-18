import Input from "../utils/Input"
import ButtonElement from "../utils/Button"
import Container from "../utils/Container"
import ErrorMsg from "../utils/ErrorMsg"
import { Text, Button, View } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../../hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import { login, getUser, getInstructor } from "../../api/api"
import Loading from "../utils/Loading"
import Error from "../utils/Error"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsh, setErrorMsg] = useState("")

    const { setUser } = useAuth()
    let token = ''

    const { mutate: getInstructorMutation } = useMutation({
        mutationFn: data => getInstructor(data),
        onSuccess: res => {
          setUser( prev => ({ ...prev, instructor: res.data[0] }))
        }
      })

    const {mutate: getUserMutation} = useMutation({
        mutationFn: data => getUser(data),
        onSuccess: res => {
            setUser(( prev => ({ ...prev, ...res.data })))
            getInstructorMutation({ token: token})
        },
        onError: err => console.log(err)
    })

    const {mutate: loginMutation, isPending} = useMutation({
        mutationFn: data => login(data),
        onSuccess: res => {
            token = res.data.access
            setUser({isAuthenticated: true, ...res.data})
            getUserMutation({ token: res.data.access })
            setErrorMsg('')
            setUsername('')
            setPassword('')
        },
        onError: err => {
            if (err.message == 'Request failed with status code 401') {
                setErrorMsg('No se encontró usuario o contraseña ingresada')
            } else if (err.message == 'Network Error') {
                setErrorMsg('Problemas con el servidor, vuélvalo a intentar en unos minutos')
            }
        },
    })


    const handleLogin = () => {
        setErrorMsg('')
        loginMutation({ username, password })
    }

    if (isPending) return <Loading />

  return (
    <>
        <Container>
            {errorMsh && <ErrorMsg>{errorMsh}</ErrorMsg>}
            <Input 
                label={'Usuario'}
                value={username}
                setter={setUsername}
            />
            <Input 
                label={'Contraseña'}
                secure={true}
                value={password}
                setter={setPassword}
            />
            <ButtonElement 
                title={'Enviar'}
                onPress={handleLogin}
            />
            {/* <View style={{ marginVertical: 35 }}>
                <Text style={{ fontSize: 17 }}>No tienes cuenta?</Text>
                <Button title="Regístrate"onPress={() => navigator.navigate('Signup')}/>
            </View> */}
        </Container>
    </>
  )
}

export default Login