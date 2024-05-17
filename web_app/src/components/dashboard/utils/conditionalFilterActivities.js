export const filterActivities = (activities, selectedCompetency, selectedCapacity, selectedCategory) => {
    if (selectedCategory != 'all') {
        console.log('Getting filtered by category')
        return activities.filter( activity => activity.category == selectedCategory && activity.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0)
    }
    else if (selectedCapacity != '') {
        console.log('Getting filtered by capacity')
        return activities.filter( activity => activity.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0)
    }
    else if (selectedCompetency != '') {
        console.log('Getting filtered by competency')
        return activities.filter( activity => activity.competences.split(',').indexOf(selectedCompetency.toString()) >= 0)
    } 
}   