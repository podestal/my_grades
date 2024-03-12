import Input from "../utils/Input"
import ButtonElement from "../utils/Button"
import Container from "../utils/Container"
import { Text, Button, View } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../../hooks/useAuth"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigator = useNavigation()
    const { user } = useAuth()


    const handleLogin = () => {
        console.log('User:', user);
    }

  return (
    <>
        <Container>
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