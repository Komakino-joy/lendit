const express = require('express');

const {
    handleSelectedAssetPost,
    handleAllUnitsPost,
    handleAllModelsPost,
    handleCheckInAssetPost,
    handleCheckOutAssetPost,
    handleQuarantineAssetPost,
    handleAddAssetPost,
    handleModelUpload,
    handleRemoveAssetDelete
} = require('./assets.controller');

const assetsRouter = express.Router();

// Return selected asset from drop down options
assetsRouter.post('/asset', handleSelectedAssetPost);

// Populate asset drop-down options
assetsRouter.post('/allunits', handleAllUnitsPost);

// Populate model drop-down options
assetsRouter.post('/allmodels', handleAllModelsPost);

// Check-in a unit when check in button is pressed.
assetsRouter.post('/checkin', handleCheckInAssetPost);

// Check-out a unit when check out button is pressed.
assetsRouter.post('/checkout', handleCheckOutAssetPost);

// Check a unit into quarantine when submit button is pressed.
assetsRouter.post('/quarantine', handleQuarantineAssetPost);

// Add an asset from the asset pop-up module.
assetsRouter.post('/addasset', handleAddAssetPost);

assetsRouter.delete('/removeasset', handleRemoveAssetDelete)

// Handle image file upload when adding a model from the add model modal.
assetsRouter.post('/upload', handleModelUpload)

module.exports = assetsRouter;