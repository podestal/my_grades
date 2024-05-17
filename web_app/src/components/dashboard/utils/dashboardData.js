import { calculateSimpleAverage, calculateAverageWithCats, getAveragesForCompetency } from "../../../data/calculateAverage"
import { capacitiesData } from "../../../data/capacities";

const capacityAverages = []

const getAveragesData = (student, selectedCompetence, selectedCapacity, selectedCategory, activities, studentGrades, categories, filteredCapacitiesByCompetence) => {
    // console.log('selectedCapacity', selectedCapacity)
    if (selectedCompetence != '' && selectedCapacity == '' && selectedCategory == 'all') {
        // console.log('not calculating anything yet');
        
    }
    if (selectedCompetence != '' && selectedCapacity != '' && selectedCategory == 'all') {
        console.log('caluclating averages with cats');
        const averageWithCats = calculateAverageWithCats(studentGrades, activities, categories, selectedCapacity)
        const calification = averageWithCats ? averageWithCats : '-'
        // const calification = 'ADX'
        return {calification, id: 0}
    } else if (selectedCompetence != '' && selectedCapacity != '' && selectedCategory != 'all') {
        console.log('caluclating averages without cats');
        const simpleCategoryAverage = calculateSimpleAverage(studentGrades, activities, selectedCategory)
        const calification = simpleCategoryAverage ? simpleCategoryAverage : '-'
        // const calification = 'ADX'
        return {calification, id: 0}
    }
    return {calification: '-', id: 0}
    // const average = student.averages
    //     .find(average => average?.quarter == quarter && average?.competence == selectedCompetency)
    // const averageCalculated = calculateAverage(studentGrades, selectedCompetency, activities, categories, selectedCategory) || 'NA'

    // const averageObject = Object.assign({            
    //     'fullName': `${student.first_name} ${student.last_name}`,
    //     'average': average ? {calification: average?.calification, id: average.id}  : {calification: averageCalculated, id: 0},
    // }, ...gradesActivity)

    // const noAverageObject = Object.assign({            
    //     'fullName': `${student.first_name} ${student.last_name}`,
    //     'average': {calification: '-', id: 0}
    // }, ...gradesActivity)
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

const getDashboardData = (students, filter, grades, selectedCompetency, selectedCapacity, selectedCategory, activities, categories) => {
    // getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory)
    // console.log('filtered activities by comp',activities)
    // console.log('activities', activities.length)
    // console.log('capacityAverages', capacityAverages)
    const filteredCapacitiesByCompetence = capacitiesData.filter( capacity => capacity.competence == selectedCompetency)
    const filteredAcitivitesByCompetence = activities.filter( activity => activity.competences.split(',').indexOf(selectedCompetency.toString()) >= 0)
    // const filteredAcitivitesByCapaciy = activities.filter( activity => activity.capacity.split(',').indexOf(capacity.toString()) >= 0)
    return students
        .filter( student => (
            `${student?.first_name} ${student?.last_name}`
            .toLowerCase()
            .includes(filter.toLowerCase())
        ))
        .map( student => {
            const studentGrades = getStudentGrades(grades, student)
            const capacitiesData = filteredCapacitiesByCompetence.map(capacity => {
                const filteredAcitivitesByCapaciy = activities.filter( activity => activity.capacities.split(',').indexOf(capacity.id.toString()) >= 0)
                const allAverages = calculateAverageWithCats(studentGrades, filteredAcitivitesByCapaciy, categories)
                const capacityTitle = capacity.title
                const calification = allAverages ? allAverages : '-'
                const obj = {}
                obj[capacityTitle] = {calification, id: 0}
                return {
                    ...obj
                }
            })
            //const allAverages = calculateAverageWithCats(studentGrades, filteredAcitivitesByCompetence, categories)
            let gradesData
            if (selectedCapacity != '') {
                gradesData = getGradesData(studentGrades, student)
            } else {
                gradesData = capacitiesData
            }
            const average = getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory, filteredAcitivitesByCompetence, studentGrades, categories, filteredCapacitiesByCompetence)
            return Object.assign({            
                'fullName': `${student.first_name} ${student.last_name}`,
                'average': average
            }, ...gradesData)
        })
}

export default getDashboardData