import { StyleSheet, View, Button, Text } from "react-native";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { useState } from "react";

import React from 'react'

const Calendario = ({ setDueDate, title }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const today = toDateId(new Date(2024, currentMonth, 1))
    const [selectedDate, setSelectedDate] = useState(today);

    const handleNext = () => {
        setCurrentMonth(currentMonth+1)
    }

    const handlePrev = () => {
        setCurrentMonth(currentMonth-1)
    }

  return (
    <View style={styles.container}>  
        <Text style={{fontSize: 16, textAlign: 'center'}}>{title}</Text>
        <View style={styles.buttonsContainer}>
            <Button onPress={handlePrev} title="previous"/>
            <Button onPress={handleNext} title="next"/>
        </View>
        <Calendar
            calendarActiveDateRanges={[
                {
                startId: selectedDate,
                endId: selectedDate,
                },
            ]}
            calendarFirstDayOfWeek="sunday"
            calendarMonthId={today}
            calendarRowHorizontalSpacing={16}
            calendarRowVerticalSpacing={16}
            calendarInitialMonthId={today}
            onCalendarDayPress={(selected) => {
                setSelectedDate(selected)
                setDueDate(selected)}}
        />
    </View>
  )
}

export default Calendario

const styles = StyleSheet.create({
    container: {
        padding: 40
    },  
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})