import { Text, StyleSheet, View, Button, TextInput } from "react-native"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCompetencie, updateCompetencie } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import ErrorMsg from "../utils/ErrorMsg"
import { useState } from "react"

const Competencie = ({ data: competencie }) => {

  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [errorMsg, setErrorMsg] = useState('')
  const [update, setUpdate] = useState(false)
  const [title, setTitle] = useState(competencie?.title)
  const [percent, setPercent] = useState(String(competencie?.value * 100))


  const {mutate: deleteCompetencieMutation} = useMutation({
    mutationFn: data => deleteCompetencie(data),
    onSuccess: res => queryClient.invalidateQueries(['competencies']),
    onError: err => setErrorMsg('Su competencia no pudo ser eliminada, debido a que está siendo utilizada')
  })

  const {mutate: updateCompetencieMutation} = useMutation({
    mutationFn: data => updateCompetencie(data),
    onSuccess: res => {
      console.log(res.data)
      setUpdate(false)
      queryClient.invalidateQueries(['competencies'])},
    onError: err => {
      console.log(err)
      setErrorMsg('Su competencia no pudo ser actualizada')
    }
  })

  const handleEditMode = () => {
    setErrorMsg('')
    setUpdate(true)
  }

  const handleUpdate = () => {
    const value = parseFloat(percent)/100
    updateCompetencieMutation({ token: user.access, competencieId: competencie.id, updates: {
      title,
      value
    } })
  }

  const handleDelete = () => {
    deleteCompetencieMutation({ token: user.access, competencieId: competencie.id })
  }

  const handleCancel = () => {
    setUpdate(false)
  }

  return (
    <>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <View style={styles.competencieContainer}>
          {update
          ?
          <>
            <View>
              <TextInput 
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={inputValue => setTitle(inputValue)}
              />
              <TextInput 
                style={styles.input}
                placeholder="Valor"
                value={percent}
                onChangeText={inputValue => setPercent(inputValue)}
              />
            </View>
            <View>
              <Button onPress={handleUpdate} title="Guardar"/>
              <Button onPress={handleCancel} color={'red'} title="Cancelar"/>
            </View>
          </> 
          :
          <>
            <View>
              <Text style={styles.text}>Título: {competencie.title}</Text>
              <Text style={styles.text}>Valor: {competencie.value * 100}%</Text>
            </View>
            <View>
              <Button onPress={handleEditMode} title="Editar"/>
              <Button onPress={handleDelete} color={'red'} title="Borrar"/>
            </View>
          </>
          }
      </View>  
    </>

  )
}

export default Competencie

const styles = StyleSheet.create({
  competencieContainer: {
    alignItems: 'left',
    marginVertical: 20,
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    marginVertical: 4,
    width: 200,
    borderRadius: 20,
    fontSize: 16,
  }
})