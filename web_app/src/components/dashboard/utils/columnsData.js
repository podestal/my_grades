import { capacitiesData } from "../../../data/capacities"

export const getCapacitiesColumns = (selectedCompetency) => {
    return capacitiesData
        .filter( capacity => capacity.competence == selectedCompetency)
        .map( capacity => {
            return {
                header: capacity.title,
                accessorKey: capacity.title
            }
        })

}

export const getActivitiesColumns = (activities, selectedCapacity, selectedCategory, quarter, activitiesDict) => {
    return activities
    .filter( activity => {
        if (selectedCapacity == 'all') {
            return activity
        } else if(activity.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0) {
            return activity
        }
    })
    .filter( activity => {
        if (selectedCategory == 'all') {
            return activity
        }
        else {
            if (activity.category == selectedCategory) {
                return activity
            }
        } 
    })
    .filter( activity => activity.quarter == quarter)
    .map( activity => {
        // obj[capacityTitle] = {calification, id: 0}
        activitiesDict[activity.title] = activity
    return {
        header: activity.title,
        accessorKey: activity.title
    }})
}