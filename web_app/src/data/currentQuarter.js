import moment from "moment"
import { quartersData } from "./quarters"

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
    // TODO ...
}

