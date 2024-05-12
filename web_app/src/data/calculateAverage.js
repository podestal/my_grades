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

const filterActivitiesByCompetency = (selectedCompetency, activities) => {
    return activities.map(activity => {
        if (activity.competence == selectedCompetency) {
            return activity.id
        }
    })
}

const calculateAverage = (grades, selectedCompetency, activities) => {
    if (selectedCompetency == 'all') {
        return
    }
    const filteredActivities = filterActivitiesByCompetency(selectedCompetency, activities)
    const filteredGrades = grades.filter( grade => filteredActivities.indexOf(grade.activity) >= 0)
    const total = totalGrades(filteredGrades).length
    const sum = sumOfGrades(filteredGrades)
    const numericalAverage = String((sum / total).toFixed(0))
    const alphabeticalAverage = alphabeticalRepresentation[numericalAverage]
    return alphabeticalAverage
}

export default calculateAverage