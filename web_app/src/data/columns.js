export const getColumns = (activities) => {
    return activities.map( activity => {
        return {
            header: activity.title,
            accessorKey: activity.title
        }
    })
}
