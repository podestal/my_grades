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

const getAveragesData = (student, selectedCompetence, selectedCapacity, selectedCategory, activities, studentGrades, categories, total, filteredActivitiesByCategory, capacitiesData, studentAverage) => {
    // console.log('selectedCapacity', selectedCapacity)
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
        return {calification, id: 0, final: true}
    }
    if (selectedCompetence != '' && selectedCapacity != '' && selectedCategory == 'all') {
        console.log('caluclating averages with cats');
        const averageWithCats = calculateAverageWithCats(studentGrades, activities, categories, selectedCapacity)
        const calification = averageWithCats ? averageWithCats : '-'
        // const calification = 'ADX'
        return {calification, id: 0}
    } else if (selectedCompetence != '' && selectedCapacity != '' && selectedCategory != 'all') {
        console.log('caluclating averages without cats');
        const simpleCategoryAverage = calculateSimpleAverage(studentGrades, filteredActivitiesByCategory, selectedCategory)
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

const getDashboardData = (students, filter, grades, selectedCompetency, selectedCapacity, selectedCategory, activities, categories, quarter, assignature) => {
    // getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory)
    // console.log('filtered activities by comp',activities)
    // console.log('activities', activities.length)
    // console.log('capacityAverages', capacityAverages)
    const filteredCapacitiesByCompetence = capacitiesData.filter( capacity => capacity.competence == selectedCompetency)
    const filteredAcitivitesByCompetence = activities.filter( activity => activity.competences.split(',').indexOf(selectedCompetency.toString()) >= 0)
    const filteredActivitiesByCategory = activities.filter( activity => activity.category == selectedCategory && activity.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0)
    const total = filteredCapacitiesByCompetence.length * 4
    // const filteredAcitivitesByCapaciy = activities.filter( activity => activity.capacity.split(',').indexOf(capacity.toString()) >= 0)
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
            const capacitiesData = filteredCapacitiesByCompetence.map(capacity => {
                const filteredAcitivitesByCapaciy = activities.filter( activity => activity.capacities.split(',').indexOf(capacity.id.toString()) >= 0)
                const allAverages = calculateAverageWithCats(studentGrades, filteredAcitivitesByCapaciy, categories)
                const capacityTitle = capacity.title
                const calification = allAverages ? allAverages : '-'
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
            const average = getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory, filteredAcitivitesByCompetence, studentGrades, categories, total, filteredActivitiesByCategory, capacitiesData, studentAverage)
            return Object.assign({  
                'studentId': student.id,          
                'fullName': `${student.first_name} ${student.last_name}`,
                'average': average,
                'participations': '-',
            }, ...gradesData)
        })
}

export default getDashboardData