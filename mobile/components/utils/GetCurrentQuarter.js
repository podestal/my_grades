const convertToTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000)
}

export const getCurrentQuarter = (quartersData) => {
    const currentDate = convertToTimestamp(new Date())

    return quartersData.find( quarter => {
        const start = convertToTimestamp(new Date(quarter.startDate))
        const end = convertToTimestamp(new Date(quarter.endDate))
        if (currentDate > start && currentDate < end) {
            return quarter
        }
    })
}