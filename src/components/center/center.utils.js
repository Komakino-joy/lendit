
// Used to add a gap between updating the database and requesting the new asset details from the database
const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const assetTransaction = async( transaction, fetchNew, assetId, userId = null, ownerId, assetName, assetSerial, assetModel, assetComments) => {
    try{
        await transaction(assetId, userId, ownerId, assetName, assetSerial, assetModel, assetComments);
        await timeout(100);
        await fetchNew(assetId);
    } catch(error) {
        console.log(error)
    }
};
