import { calculateSimpleAverage, calculateAverageWithCats, getAveragesForCompetency } from "../../../data/calculateAverage"
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
    '0': 'NA',
}

const capacityAverages = []

export const getAveragesForCompetencies = () => {

    return capacityAverages
}

const getAveragesData = (student, selectedCompetence, selectedCapacity, selectedCategory, activities, studentGrades, categories, total, filteredActivitiesByCategory, capacitiesData, studentAverage, participationsAverage, participationsCat, filteredActivitiesByCapacity) => {
    if (selectedCompetence != '' && selectedCapacity == '' && selectedCategory == 'all') {
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
        const averageWithCats = calculateAverageWithCats(studentGrades, filteredActivitiesByCapacity, categories, selectedCapacity)
        let averageWithCatsAndParticipations
        if (averageWithCats && participationsAverage) {
            averageWithCatsAndParticipations = alphabeticalRepresentation[Math.round(numericalRepresentation[averageWithCats] + (numericalRepresentation[participationsAverage.calification] * participationsCat.weight))]
        }
        const totalAverage = averageWithCatsAndParticipations ? averageWithCatsAndParticipations : averageWithCats
        console.log('SELECTED CAPACITY');
        console.log('averageWithCats', averageWithCats);
        console.log('totalAverage', totalAverage);
        const calification = totalAverage ? totalAverage : '-'
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
    const participationsCat = categories.find( category => category.title.toLowerCase() != 'participaciones')
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
                const allAverages = calculateAverageWithCats(studentGrades, filteredAcitivitesByCapaciy, filteredCategoriesWithoutParticipations)
                // participationsAverage
                let averageWithCatsAndParticipations =alphabeticalRepresentation[Math.round(numericalRepresentation[allAverages] + (numericalRepresentation[participationsAverage.calification] * participationsCat.weight))]
                // if (participationsAverage) {
                //     averageWithCatsAndParticipations = alphabeticalRepresentation[Math.round(numericalRepresentation[allAverages] + (numericalRepresentation[participationsAverage.calification] * participationsCat.weight))]
                // }
                const totalAverage = averageWithCatsAndParticipations ? averageWithCatsAndParticipations : allAverages
                const capacityTitle = capacity.title
                console.log('/////////CAPACITIES');
                console.log('averageWithCatsAndParticipations', averageWithCatsAndParticipations);
                console.log('totalAverage',totalAverage);
                const calification = totalAverage ? totalAverage : '-'
                const obj = {}
                obj[capacityTitle] = {calification, id: 0}
                // console.log('...obj', [{...obj}, 'fdasfaef'])
                // console.log('...obj', {...obj})
                // console.log('...obj', [{...obj}, 'fdasfaef'][0])
                // console.log('///////////////////////////////')
                // return {
                //     ...obj,
                // }
                return [{
                    ...obj,
                }, {calification, studentId: student.id}]

            })
            // const capacitiesGrade = {}
            // capacitiesGrade[`${student?.first_name} ${student?.last_name}`] = capacitiesData
            // capacityAverages.push(capacitiesGrade)
            //const allAverages = calculateAverageWithCats(studentGrades, filteredAcitivitesByCompetence, categories)
            // console.log('capacitiesData',capacitiesData[0][0])
            let gradesData
            if (selectedCapacity != '') {
                gradesData = getGradesData(studentGrades, student)
            } else {
                gradesData = capacitiesData.map(data => data[0])
            }

            const average = getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory, filteredAcitivitesByCompetence, studentGrades, filteredCategoriesWithoutParticipations, total, filteredActivitiesByCategory, capacitiesData, studentAverage, participationsAverage, participationsCat, filteredActivitiesByCapacity)
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