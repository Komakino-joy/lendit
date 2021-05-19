
// Used to add a time gap between updating the database and requesting the new asset details from the database
const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const assetTransaction = async( transaction, fetchNew, assetId, userId, ownerId, assetName, assetSerial, assetModel, assetComments) => {
    try{
        await transaction(assetId, userId, ownerId, assetName, assetSerial, assetModel, assetComments);
        await timeout(100);
        await fetchNew(assetId);
    } catch(error) {
        console.log(error)
    }
};


export const assetTransaction2 = async(transaction ) => {
    try{
        await transaction();
    } catch(error) {
        console.log(error)
    }
};
