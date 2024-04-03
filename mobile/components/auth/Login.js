import Input from "../utils/Input"
import ButtonElement from "../utils/Button"
import Container from "../utils/Container"
import ErrorMsg from "../utils/ErrorMsg"
import { Text, Button, View } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../../hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import { login, getUser, getProfile } from "../../api/api"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsh, setErrorMsg] = useState("")

    const navigator = useNavigation()
    const { setUser } = useAuth()

    const {mutate: getProfileMutation} = useMutation({
        mutationFn: data => getProfile(data),
        onSuccess: res =>  setUser(( prev => ({ ...prev, ...res.data[0] }))),
        onError: err => console.log(err)
    })

    const {mutate: getUserMutation} = useMutation({
        mutationFn: data => getUser(data),
        onSuccess: res => {
            setUser(( prev => ({ ...prev, ...res.data })))
        },
        onError: err => console.log(err)
    })

    const {mutate: loginMutation} = useMutation({
        mutationFn: data => login(data),
        onSuccess: res => {
            console.log('Login ...')
            setUser({ isAuthenticated: true, ...res.data })
            console.log('Getting User')
            getUserMutation({ token: res.data.access })
            console.log('Getting Profile')
            getProfileMutation({ token: res.data.access })
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
            <View style={{ marginVertical: 35 }}>
                <Text style={{ fontSize: 17 }}>No tienes cuenta?</Text>
                <Button title="Regístrate"onPress={() => navigator.navigate('Signup')}/>
            </View>
        </Container>
    </>
  )
}

export default Login