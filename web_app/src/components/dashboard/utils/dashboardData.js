import { calculateSimpleAverage } from "../../../data/calculateAverage"

const getAveragesData = (student, selectedCompetence, selectedCapacity, selectedCategory, activities, studentGrades) => {
    // TODO ...
    if (selectedCompetence != '' && selectedCategory == 'all') {
        // TODO...
        // return complex average calculation (includes cats)
        return {calification: 'NA', id: 0}
    } else if (selectedCompetence != '' && selectedCategory != 'all') {
        // TODO...
        // grades, activities, selectedCategory needed
        // return simple average calculation (sum/total)
        const simpleCategoryAverage = calculateSimpleAverage(studentGrades, activities, selectedCategory)
        const calification = simpleCategoryAverage ? simpleCategoryAverage : '-'
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

const getDashboardData = (students, filter, grades, selectedCompetency, selectedCapacity, selectedCategory, activities) => {
    // getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory)
    return students
        .filter( student => (
            `${student?.first_name} ${student?.last_name}`
            .toLowerCase()
            .includes(filter.toLowerCase())
        ))
        .map( student => {
            const studentGrades = getStudentGrades(grades, student)
            const gradesData = getGradesData(studentGrades, student)
            const average = getAveragesData(student, selectedCompetency, selectedCapacity, selectedCategory, activities, studentGrades)
            return Object.assign({            
                'fullName': `${student.first_name} ${student.last_name}`,
                'average': average
            }, ...gradesData)
        })
}

export default getDashboardData