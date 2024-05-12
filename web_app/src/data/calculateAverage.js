const numericalRepresentation = {
    'AD': 4,
    'A': 3,
    'B': 2,
    'C': 1,
    'NA': 0,
}

const alphabeticalRepresentation = {
    '4': 'AD',
    '3': 'A',
    '2': 'B',
    '1': 'C',

}

const totalGrades = (grades) => {
    return grades.filter(grade => grade.calification != 'NA')
}

const sumOfGrades = (grades) => {
    return grades.reduce((average, grade) => {
        console.log('average',average)
        return average + numericalRepresentation[grade.calification]
    }, 0)
}

const calculateAverage = (grades) => {
    const total = totalGrades(grades).length
    const sum = sumOfGrades(grades)
    const numericalAverage = String((sum / total).toFixed(0))
    const alphabeticalAverage = alphabeticalRepresentation[numericalAverage]
    return alphabeticalAverage
}

export default calculateAverage