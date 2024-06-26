export const getClasesIds = (assignatures) => {
    const clasesIds = []
    assignatures?.map( assignature =>{
        if (clasesIds.indexOf(assignature.clase.id) == -1) {
            clasesIds.push(assignature.clase.id)
        }})
    return clasesIds
}

export const getClasesForInstructors = (clases, clasesIds) => {
    if (clasesIds.length > 0) {
        return clases?.filter( singleClase => clasesIds.indexOf(singleClase.id) >= 0)
    }
}