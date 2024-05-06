export const filterGradesByActivity = (grades, activity) => {
    return grades.filter( grade => grade?.activity?.id == activity.id)
}

export const getCategoryById = (categories, id) => {
    return categories.get( category => category.id == id)
}