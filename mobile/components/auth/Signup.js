import Input from "../utils/Input"
import Container from "../utils/Container"
import Title from "../utils/Title"
import ButtonElement from "../utils/Button"
import { ScrollView } from "react-native"
import { useState } from "react"


// label, type, secure, value, setter
const Signup = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [schoolCode, setSchoolCode] = useState("")

  const handleSignup = () => {
    console.log('Registered')
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
            <Input 
              label={'Correo Electrónico'}
              value={email}
              setter={setEmail}
              type={'email-address'}
            />
            <Input 
              label={'Nombres'}
              value={firstName}
              setter={setFirstName}
            />
            <Input 
              label={'Apellidos'}
              value={lastName}
              setter={setLastName}
            />
            <Input 
              label={'Código de colegio'}
              value={schoolCode}
              setter={setSchoolCode}
            />
            <ButtonElement 
              title="Enviar"
              onPress={handleSignup}
            />
        </Container>
    </>
  )
}

export default Signup