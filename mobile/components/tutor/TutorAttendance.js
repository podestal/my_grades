import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"

const TutorAttendance = ({ data: attendance }) => {

    const late = attendance.status == 'L'
    const color = late ? '#e67e22' : '#e74c3c'

    const styles = StyleSheet.create({
        container: {
            margin: 18
        },
        subTitleContainer: {
            padding: 8,
            width: 140,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            marginVertical: 12,
        },
        subTitle: {
            fontSize: 22,
            color: '#fff',
            fontWeight: 'bold',
        },
        text: {
            fontSize: 18,
            marginTop: 14,
        }
    })

  return (
    <View style={styles.container}>
        <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>{late ? 'Tardanza' : 'Falta'}</Text>
        </View>
        <Text style={styles.text}>Fecha: {attendance.created_at}</Text>
        <Text style={styles.text}>{late && `Hora: ${attendance.hour}`}</Text>
    </View>
  )
}

export default TutorAttendance
