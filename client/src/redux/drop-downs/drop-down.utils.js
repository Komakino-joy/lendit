export const calculateTotals = (payload) => {
    return {
        availableAssets: payload.filter(({status}) => status === 'Available').length,
        assetsInUse: payload.filter(({in_use_by}) => in_use_by !== null).length,
        quarantineAssets: payload.filter(({status}) => status === 'Quarantine').length
    }
}

export const updateDropDownObject = (array, targetId, newValue) => {
    const objIndex = array.findIndex((obj => obj.id === targetId));
    array[objIndex] = newValue;

    return array;
}