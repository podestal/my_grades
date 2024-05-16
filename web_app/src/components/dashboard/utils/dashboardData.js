const getAveragesData = (student) = () => {
    // TODO ...
    
    //     const average = student.averages
//         .find(average => average?.quarter == quarter && average?.competence == selectedCompetency)
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

const getGradesData = (grades, student) => {
    const studentGrades = grades.filter(grade => grade?.student?.id == student.id)
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

const getDashboardData = (students, filter, grades) => {
    return students
    .filter( student => (
        `${student?.first_name} ${student?.last_name}`
        .toLowerCase()
        .includes(filter.toLowerCase())
    ))
    .map( student => {
        const gradesData = getGradesData(grades, student)
        return Object.assign({            
            'fullName': `${student.first_name} ${student.last_name}`,
            'average': {calification: '-', id: 0}
        }, ...gradesData)
    })
}

export default getDashboardData