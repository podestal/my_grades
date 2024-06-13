export const numericalRepresentation = {
    'AD': 4,
    'A': 3,
    'B': 2,
    'C': 1,
    'NA': 0,
}

export const alphabeticalRepresentation = {
    '4': 'AD',
    '3': 'A',
    '2': 'B',
    '1': 'C',
    '0': 'C'
}

const totalGrades = (grades) => {
    let total = 0
    grades
        .filter(grade => grade.calification != 'NA')
        .map( grade => total += 4)
    return total
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

const filterActivitiesByCapacity = (selectedCapacity, activities) => {
    return activities.filter(activity => {
        const capacities = activity.capacities.split(',')
        if (capacities.indexOf(selectedCapacity.toString()) >= 0) {
            return activity.id
        }
    })
}

const filterActivitiesByCompetency = (selectedCompetency, activities) => {
    return activities.map(activity => {
        if (activity.competence == selectedCompetency) {
            return activity.id
        }
    })
}

const filterActivitiesByCategory = (selectedCategory, activities) => {
    const activitiesIds = []
    activities.map(activity => {
        if (activity?.category == selectedCategory) {
            activitiesIds.push(activity.id)
        }
    })
    return activitiesIds
}

const calculateAverage = (grades, selectedCompetency, activities, categories, selectedCategory) => {

    const filteredActivities = filterActivitiesByCompetency(selectedCompetency, activities)
    const filteredGrades = getFilteredGrades(grades, filteredActivities, selectedCategory)
    const total = totalGrades(filteredGrades).length
    const sum = sumOfGrades(filteredGrades, categories, selectedCategory)
    const numericalAverage = String((sum / total).toFixed(0))
    const alphabeticalAverage = alphabeticalRepresentation[numericalAverage]
    return alphabeticalAverage
}

export const calculateSimpleAverage = (grades, activities, selectedCategory) => {
    
    const filteredActivitiesByCategory = filterActivitiesByCategory(selectedCategory, activities)
    // console.log('filteredActivitiesByCategory', filteredActivitiesByCategory)
    const filteredGrades = grades.filter( grade => filteredActivitiesByCategory.indexOf(grade.activity.id) >= 0)
    // console.log('filteredGrades', filteredGrades)
    const total = totalGrades(filteredGrades)
    const sum = filteredGrades.reduce((sum, grade) => {
                    return sum + numericalRepresentation[grade.calification]
                }, 0)
    const numericalAverage = String(Math.round((sum / total) * 4))
    const alphabeticalAverage = alphabeticalRepresentation[numericalAverage]
    return alphabeticalAverage
}

export const calculateAverageWithCats = (grades, activities, categories ) => {
    // calculateAverageWithCats(studentGrades, filteredActivitiesByCapacity, categories, participationsCat)

    const catAverages = categories && categories.map( category => {
        const catAverage = calculateSimpleAverage(grades, activities, category.id)
        if (catAverage != undefined) {
            // console.log(`average: ${catAverage} Cat: ${category.title}`);
            return ((numericalRepresentation[catAverage]/4) * category.weight) * 4
        }
        
    })
    const final = catAverages.reduce((sum, average) => {
        if (average) {
            sum += average
        }
        return sum
    }, 0)
    // console.log('////////////////')
    // console.log('student', student)
    // console.log('final',alphabeticalRepresentation[Math.round(final)])
    // console.log('participationsAverage', participationsAverage)
    return final == 0 ? '-' : alphabeticalRepresentation[Math.round(final)]
}

export const getAveragesForCompetency = (capacities, grades, categories, activities) => {
    console.log('filtered capacities', capacities)
    // const competencesAverages = capacities.map(capacity => {
    //     const capacityAverage = calculateAverageWithCats(grades, activities, categories)
    //     return capacityAverage
    // })
    // console.log('competencesAverages', competencesAverages);

}

export default calculateAverage