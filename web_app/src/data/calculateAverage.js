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
    '0': 'C'

}

const totalGrades = (grades) => {
    return grades.filter(grade => grade.calification != 'NA')
}

const getFilteredGrades = (grades, filteredActivities, selectedCategory) => {
    if (selectedCategory != 'all') {
        return grades
            .filter( grade => filteredActivities.indexOf(grade.activity.id) >= 0)
            .filter( grade => grade.activity.category == selectedCategory)
    } else {
        return grades
            .filter( grade => filteredActivities.indexOf(grade.activity.id) >= 0)
    }
}

const sumOfGrades = (grades, categories, selectedCategory) => {

    if (selectedCategory != 'all') {
        return grades.reduce((sum, grade) => {
            return sum + numericalRepresentation[grade.calification]
        }, 0)
    } else {
        return grades.reduce((sum, grade) => {
            const category = categories &&  categories.find(category => category.id == grade?.activity?.category)
            return category ? sum + Math.round(numericalRepresentation[grade.calification] * category?.weight) : sum + numericalRepresentation[grade.calification]
        }, 0)
    }
}

const filterActivitiesByCompetency = (selectedCompetency, activities) => {
    return activities.map(activity => {
        if (activity.competence == selectedCompetency) {
            return activity.id
        }
    })
}

const calculateAverage = (grades, selectedCompetency, activities, categories, selectedCategory) => {

    const filteredActivities = filterActivitiesByCompetency(selectedCompetency, activities)
    const filteredGrades = getFilteredGrades(grades, filteredActivities, selectedCategory)
    const total = totalGrades(filteredGrades).length
    console.log('filteredGrades ==',total)
    const sum = sumOfGrades(filteredGrades, categories, selectedCategory)
    const numericalAverage = String((sum / total).toFixed(0))
    const alphabeticalAverage = alphabeticalRepresentation[numericalAverage]
    return alphabeticalAverage
}

export default calculateAverage