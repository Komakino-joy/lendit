const db = require('../../models/asset_db');
const { nanoid } = require('nanoid');

async function handleSelectedAssetPost(req, res) {
    const { owner_id, id: asset_id } = req.body;

    try {
        const response = await db
            .select('a.*', 'm.image')
            .from('assets AS a')
            .innerJoin('models AS m', function() {
                this.on('m.model_name', 'a.model')
                    .andOn('m.owner_id', 'a.owner_id')
            })
            .where({
                'm.owner_id': owner_id,
                'a.id': asset_id,
                });

        return res.status(200).json(response[0]);

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong. Please try again later.',
            error,
        });
    }

};

async function handleAllUnitsPost(req, res) {
    try {
        const allAssets = await 
            db.select('a.*', 'm.image')
            .from('assets AS a')
            .leftJoin('models AS m', function() {
                this.on('m.model_name', '=', 'a.model')
                    .andOn('m.owner_id', '=', 'a.owner_id')
            })
            .where('a.owner_id', '=' , req.body.memberId)
            .orderBy('id');
        
        res.status(200).json({ assetList: allAssets })
    } catch (error) {
        return error => res.status(400).json(error)   
    }
};

async function handleAllModelsPost(req, res) {
    try {
        const allModels = await db.select('model_name AS id', 'image')
                             .from('models')
                             .where('owner_id', '=', req.body.memberId )
                             .orderBy('model_name')

        res.status(200).json({ modelList: allModels });

    } catch (error) {
        return error => res.status(400).json(error)   
    }
};

async function getUpdatedAssetDetails(dbCursor, owner, id) {      
        const data = await dbCursor.select('a.*', 'm.image')
            .from('assets AS a')
            .leftJoin(
                'models AS m', 
                function() {
                        this.on('m.model_name', '=', 'a.model')
                            .andOn('m.owner_id', '=', 'a.owner_id')
                        })
                .where({
                    'a.owner_id' : owner, 
                    'a.id': id
                });
        
        const updatedAsset = data[0];

        return updatedAsset;
};

async function recordTransaction(dbCursor, transactionDetails, action ) {
    const { owner, id, username, assetName, assetSerial, assetModel, comments } = transactionDetails;
    await dbCursor.insert({
            owner_id: owner,
            user_id: username,
            asset_id: id,
            asset_name: assetName,
            model_name: assetModel,
            asset_serial: assetSerial,
            action,
            comments,
            created_dttm: new Date(),
        })
        .into('activity_tracking');
};

async function updateAssetDetails( dbCursor, assetId, newValues ) {
    return await dbCursor('assets')
        .where('id', '=', assetId)
        .update(newValues);
};

async function handleCheckInAssetPost(req, res) {
    const { id, owner} = await req.body;

    try {        
        await db.transaction( async(trx) => {

            await updateAssetDetails(trx, id, { 
                status: 'Available', 
                comments: '', 
                in_use_by: null,
            });

            await recordTransaction(trx, req.body, 'Asset checked in')
            const updatedAsset = await getUpdatedAssetDetails(trx, owner, id);

            
            try {
                await trx.commit();
            } catch (error) {
                trx.rollback()
            }

            return res.status(202).json({ 
                 updatedAsset
            });
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    };

};

async function handleCheckOutAssetPost (req, res) {

    const { id, username, owner, fname, lname } = req.body; 

    // Check to see if user already has an asset checked out 
    // const hasAsset = await db.select('*')
    //                         .from('assets')
    //                         .where('in_use_by', '=', username)
    //                         .where('owner_id', '=', owner)


    // if ( !!hasAsset.length ) {
    //     return res.status(202).send({
    //         message: `${username} already has asset ${hasAsset[0].name} checked out`
    //     });
    // }

    try {        
        await db.transaction( async(trx) => {

            const assetDetails = await trx('assets').select('*').where('id', '=', req.body.id);
            const status = assetDetails[0].status;

            if (status.slice(0, 10) === 'In Use By ') return;
 
            await updateAssetDetails(trx, id, {
                comments: '', 
                in_use_by: username,
                last_checkout: new Date(), 
                status: `In Use By ${fname} ${lname}` , 
            });

            await recordTransaction(trx, req.body, 'Asset checked out');

            const updatedAsset = await getUpdatedAssetDetails(trx, owner, id);

            try {
                await trx.commit();
            } catch (error) {
                trx.rollback
            }
            
            return res.status(202).json({ 
                updatedAsset
           });
        })

    } catch (error) {
        return res.status(400).json(error)
    };
};
 
async function handleQuarantineAssetPost (req, res) {
    const { id, owner, comments } = req.body;

    try {        
        await db.transaction( async(trx) => {
            await updateAssetDetails(trx, id, {
                in_use_by: null,
                status: 'Quarantine', 
                comments: comments,
            });

            await recordTransaction(trx, req.body, 'Asset quarantined');

            const updatedAsset = await getUpdatedAssetDetails(trx, owner, id);

            try {
                await trx.commit();
            } catch (error) {
                trx.rollback();
            }

            return res.status(202).json({ 
                updatedAsset
           });
            
        });
    } catch (error) {
        return res.status(400).json(error)
    };
};

// Adding new assets to the database
async function handleAddAssetPost(req, res) {

    const { id, name, model, serial, memberId } = req.body;

    try {
        const newAsset = await db('assets')
        .insert({ 
            id: id, 
            status: 'Available',
            name, 
            model, 
            serial, 
            owner_id: memberId, 
        }).returning('*');

        await db.commit;

        return res.status(200).send({
            message:`${req.body.id} successfully created.`,
            newAsset: newAsset[0],
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).send({ message: `${req.body.id} already exists.`})
        }

        return res.status(400).send({ message: `Something went wrong, please try again later.`})
    };
    
};

// Adding new models to the database
async function handleModelUpload(req, res) {
    const {image, model, memberId}  = req.body;

    try {        
        if (image && model && memberId){

            await db.insert({
                name: `${nanoid()}.jpg`, 
                image, 
                model_name: model, 
                owner_id: memberId
            }).into('models').returning('model_name');

            return await res.status(200).json({ 
                message:`${model} saved successfully.`,
            })
        };
    } catch (error) {

        if (error.code === '23505') {
            return res.status(400).send({ message: `${model} already exists.`})
        }

        return res.status(400).send({ 
            message: `Something went wrong, please try again later.`,
            error
        })
    }
};

// Deleting an asset from the database
async function handleRemoveAssetDelete(req, res) {

    const { memberId, assetId } = req.body;

    try {
        const deletedAssetId = await db('assets')
        .where({ owner_id: memberId, id: assetId })
        .delete()
        .returning('id'); 

        return await res.status(200).json({ 
            message:`${ assetId } has been successfully deleted.`,
            deletedAssetId: deletedAssetId[0],
        })
    } catch (error) {
        return error => res.status(400).json(error)
    }

};

module.exports = {
    handleSelectedAssetPost,
    handleAllUnitsPost,
    handleAllModelsPost,
    handleCheckInAssetPost,
    handleCheckOutAssetPost,
    handleQuarantineAssetPost,
    handleAddAssetPost,
    handleModelUpload,
    handleRemoveAssetDelete
};