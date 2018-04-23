export const updateObject = (source, updatedObj) => {
    return {
        ...source,
        ...updatedObj
    }
}