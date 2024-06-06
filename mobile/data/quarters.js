export const quartersData = [
    {
        'id': 'Q1',
        'title': 'B1',
        'startDate' : '2024-03-11',
        'endDate': '2024-05-10',
    },
    {
        'id': 'Q2',
        'title': 'B2',
        'startDate' : '2024-05-13',
        'endDate': '2024-07-19',
    },
    {
        'id': 'Q3',
        'title': 'B3',
        'startDate' : '2024-08-05',
        'endDate': '2024-11-10',
    },
    {
        'id': 'Q4',
        'title': 'B4',
        'startDate' : '2024-10-14',
        'endDate': '2024-12-20',
    },
]

const convertToTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000)
}

export const getCurrentQuarter = () => {
    const currentDate = convertToTimestamp(new Date())

    return quartersData.find( quarter => {
        const start = convertToTimestamp(new Date(quarter.startDate))
        const end = convertToTimestamp(new Date(quarter.endDate))
        if (currentDate > start && currentDate < end) {
            return quarter
        }
    })
}
