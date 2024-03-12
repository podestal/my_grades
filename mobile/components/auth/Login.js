import Title from "../utils/Title"
import Input from "../utils/Input"
import ButtonElement from "../utils/Button"
import Container from "../utils/Container"
import { Text, Button, View } from "react-native"
import { useState } from "react"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        console.log('login');
    }

  return (
    <>
        <Title>Ingresa</Title>
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
                <Button title="Regístrate"/>
            </View>
        </Container>
    </>
  )
}

export default Login