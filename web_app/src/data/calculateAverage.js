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

const sumOfGrades = (grades, categories) => {
    return grades.reduce((sum, grade) => {
        console.log('grade.activity',grade.activity)
        const category = categories &&  categories.find(category => category.id == grade?.activity?.category)
        console.log('category',category)
        console.log('grade times cat:', Math.round(numericalRepresentation[grade.calification] * category?.weight))
        return category ? sum + Math.round(numericalRepresentation[grade.calification] * category?.weight) : sum + numericalRepresentation[grade.calification]
        // return sum + numericalRepresentation[grade.calification]
    }, 0)
}

const filterActivitiesByCompetency = (selectedCompetency, activities) => {
    return activities.map(activity => {
        if (activity.competence == selectedCompetency) {
            return activity.id
        }
    })
}

const calculateAverage = (grades, selectedCompetency, activities, categories) => {
    if (selectedCompetency == 'all') {
        return
    }
    const filteredActivities = filterActivitiesByCompetency(selectedCompetency, activities)
    const filteredGrades = grades.filter( grade => filteredActivities.indexOf(grade.activity.id) >= 0)
    const total = totalGrades(filteredGrades).length
    const sum = sumOfGrades(filteredGrades, categories)
    const numericalAverage = String((sum / total).toFixed(0))
    const alphabeticalAverage = alphabeticalRepresentation[numericalAverage]
    return alphabeticalAverage
}

export default calculateAverage