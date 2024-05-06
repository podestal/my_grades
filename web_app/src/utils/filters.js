export const filterGradesByActivity = (grades, activity) => {
    return grades.filter( grade => grade?.activity?.id == activity.id)
}