export const getActivitiesColumns = (activities, selectedCompetency, selectedCategory, quarter) => {
    return activities
    // .filter( activity =>  {
    //     if (selectedCompetency == 'all') {
    //         return activity
    //     }
    //     else {
    //         if (activity?.competence == selectedCompetency) {
    //             return activity
    //         }
    //     } 
        
    // })
    // .filter( activity => {
    //     if (selectedCategory == 'all') {
    //         return activity
    //     }
    //     else {
    //         if (activity.category == selectedCategory) {
    //             return activity
    //         }
    //     } 
    // })
    // .filter( activity => activity.quarter == quarter)
    .map( activity => {
    return {
        header: activity.title,
        accessorKey: activity.title
    }})
}