import { calculateAverageWithCats, getAveragesForCompetency } from "../../../data/calculateAverage"
import { capacitiesData } from "../../../data/capacities";

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
    '0': '-',
}

const totalGrades = (grades) => {
    let total = 0
    grades
        .filter(grade => grade.calification != 'NA')
        .map( grade => total += 4)
    return total
}

const capacityAverages = []

const filterActivitiesByCategory = (selectedCategory, activities) => {
    const activitiesIds = []
    activities.map(activity => {
        if (activity?.category == selectedCategory) {
            activitiesIds.push(activity.id)
        }
    })
    return activitiesIds
}

const calculateSimpleAverage = (grades, activities, selectedCategory) => {
    
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

const calculateAverageWithCatsAndParticipations = (grades, activities, categories , participationsAverage, student) => {

    const catAverages = categories && categories.map( category => {
        if (category.title.toLowerCase() == 'participaciones') {
            return (numericalRepresentation[participationsAverage.calification]/4 * category.weight) * 4
        } else {
            const catAverage = calculateSimpleAverage(grades, activities, category.id)
            if (catAverage != undefined) {
                return ((numericalRepresentation[catAverage]/4) * category.weight) * 4
            }
        }
    })
    const final = catAverages.reduce((sum, average) => {
        if (average) {
            sum += average
        }
        return sum
    }, 0)
    return final == 0 ? '-' : alphabeticalRepresentation[Math.round(final)]
}

export const getAveragesForCompetencies = () => {

    return capacityAverages
}

const getParticipationsData = (student, quarter, assignature, selectedCompetency, selectedCapacity) => {
    const filteredParticipations = student.participations.filter( participation => 
        participation.quarter == quarter &&
        participation.assignature == assignature.id &&
        participation.competences.split(',').indexOf(selectedCompetency.toString()) >= 0 &&
        participation.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0
    )
    const total = filteredParticipations.length * 4
    const sumOfCalifications = filteredParticipations?.reduce((sum, participation) => {
        sum += numericalRepresentation[participation.calification]
        return sum
    }, 0)
    const participationsAverage = alphabeticalRepresentation[Math.round((sumOfCalifications / total) * 4)]
    const randomId = Math.floor(Math.random() * 100000)
    const calification = participationsAverage ? participationsAverage : '-'
    return {calification, id:randomId, participation:true}
}

const getAveragesData = (student, selectedCompetence, selectedCapacity, selectedCategory, activities, studentGrades, categories, total, filteredActivitiesByCategory, capacitiesData, studentAverage, participationsAverage, participationsCat, filteredActivitiesByCapacity,assignature, quarter) => {
    if (selectedCompetence != '' && selectedCapacity == '' && selectedCategory == 'all') {
        // console.log('studentAverage', studentAverage)
        if (studentAverage) {
            return {calification: studentAverage.calification, id: studentAverage.id, conclusion: studentAverage.conclusion, final: true}
        }
        let sum = 0
        
        capacitiesData.map( data => {
            if (data[1].studentId == student.id) {
                sum+= numericalRepresentation[data[1].calification]
            }
        })
        const calification = !sum ? '-' : alphabeticalRepresentation[Math.round((sum/total) * 4)]
        // console.log('averages', calification)
        return {calification, id: 0, final: true}
    }
    if (selectedCompetence != '' && selectedCapacity != '' && selectedCategory == 'all') {
        const participationsAverage = getParticipationsData(student, quarter, assignature, selectedCompetence, selectedCapacity)
        const participationsData = getParticipationsData(student, quarter, assignature, selectedCompetence, selectedCapacity)
        const averageWithCats = calculateAverageWithCatsAndParticipations(studentGrades, filteredActivitiesByCapacity,  categories, participationsAverage, student)
        let averageWithCatsAndParticipations
        if (averageWithCats && participationsAverage) {
            averageWithCatsAndParticipations = alphabeticalRepresentation[Math.round(numericalRepresentation[averageWithCats] + (numericalRepresentation[participationsAverage.calification] * participationsCat.weight))]
        }
        const totalAverage = averageWithCatsAndParticipations ? averageWithCatsAndParticipations : averageWithCats
        const calification = averageWithCats ? averageWithCats : '-'
        // const calification = averageWithCats ? averageWithCats : '-'
        return {calification, id: 0}
    } else if (selectedCompetence != '' && selectedCapacity != '' && selectedCategory != 'all') {
        // console.log('caluclating averages without cats');
        const simpleCategoryAverage = calculateSimpleAverage(studentGrades, filteredActivitiesByCategory, selectedCategory)
        const calification = simpleCategoryAverage ? simpleCategoryAverage : '-'
        return {calification, id: 0}
    }
    return {calification: '-', id: 0}
}

const getStudentGrades = (grades, student) => {
    return grades.filter(grade => grade?.student?.id == student.id)
}

const getCapacitiesData = (capacities, capacitiesAverage) => {
    return capacities.map( capacity => {
        const capacityTitle = capacity.title
        const obj = {}
        obj[capacityTitle] = {calification: '-', id: 0}
        return {
            ...obj
        }
    })
    // const averages = capacitiesAverage.map( grade => {
    //     const capacity = grade?.capacity
    //     const obj = {}
    //     obj[capacity] = {calification: '-', id: grade.id}
    // })
}

const getGradesData = (studentGrades) => {
    const gradesActivity = studentGrades.map( grade => {
        const activity = grade?.activity?.title
        const obj = {}
        obj[activity] = {calification: grade.calification, id: grade.id}
        return {
            ...obj
        }
    })
    return gradesActivity
}

const getDashboardData = (students, filter, grades, selectedCompetency, selectedCapacity, selectedCategory, activities, categories, quarter, assignature) => {

    const filteredCategoriesWithoutParticipations = categories.filter( category => category.title.toLowerCase() != 'participaciones')
    const participationsCat = categories.find( category => category.title.toLowerCase() == 'participaciones')
    const filteredCapacitiesByCompetence = capacitiesData.filter( capacity => capacity.competence == selectedCompetency)
    const filteredAcitivitesByCompetence = activities.filter( activity => activity.competences.split(',').indexOf(selectedCompetency.toString()) >= 0)
    const filteredActivitiesByCapacity = activities.filter( activity => activity.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0)
    const filteredActivitiesByCategory = activities.filter( activity => activity.category == selectedCategory && activity.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0)
    const total = filteredCapacitiesByCompetence.length * 4

    return students
        .filter( student => (
            `${student?.first_name} ${student?.last_name}`
            .toLowerCase()
            .includes(filter.toLowerCase())
        ))
        .map( student => {
            // student.averages.map( average => console.log('average', average))
            const studentAverage = student.averages.find( average => average.competence == selectedCompetency && average.quarter == quarter && average.assignature == assignature.id)
            const studentGrades = getStudentGrades(grades, student)
            const participationsAverage = getParticipationsData(student, quarter, assignature, selectedCompetency, selectedCapacity)
            const capacitiesData = filteredCapacitiesByCompetence.map(capacity => {
                const filteredAcitivitesByCapaciy = activities.filter( activity => activity.capacities.split(',').indexOf(capacity.id.toString()) >= 0)
                const allAverages = calculateAverageWithCatsAndParticipations(studentGrades, filteredAcitivitesByCapaciy, filteredCategoriesWithoutParticipations, student)

                let averageWithCatsAndParticipations = alphabeticalRepresentation[Math.round(numericalRepresentation[allAverages] + (numericalRepresentation[participationsAverage.calification] * participationsCat.weight))]
                const totalAverage = averageWithCatsAndParticipations ? averageWithCatsAndParticipations : allAverages
                const capacityTitle = capacity.title
                const calification = totalAverage ? totalAverage : '-'
                const obj = {}
                obj[capacityTitle] = {calification, id: 0}
                return [{
                    ...obj,
                }, {calification, studentId: student.id}]

            })
            let gradesData
            if (selectedCapacity != '') {
                gradesData = getGradesData(studentGrades, student)
            } else {
                gradesData = capacitiesData.map(data => data[0])
            }
            const average = getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory, filteredAcitivitesByCompetence, studentGrades, categories, total, filteredActivitiesByCategory, capacitiesData, studentAverage, participationsAverage, participationsCat, filteredActivitiesByCapacity, assignature, quarter)
            return Object.assign({  
                'student': student,
                'studentId': student.id,          
                'fullName': `${student.first_name} ${student.last_name}`,
                'average': average,
                'participations': participationsAverage,
            }, ...gradesData)
        })
}

export default getDashboardData