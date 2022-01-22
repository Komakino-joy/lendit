const express = require('express');

const reportsRouter = express.Router();

const {
    handleAvailableAssetsPost,
    handleQuarantinedAssetsPost,
    handleAssetsInUsePost,
    handleMultipleAssetsCheckedOutPost,
    handleActivityTrackingPost,
    handleEmailDistroPost,
    handleRemoveEmailFromDistroDelete,
    handleAddEmailToDistroPost
} = require('./reports.controller')


// Populate the available units report.
reportsRouter.post('/availableassets', handleAvailableAssetsPost);

// Populate the quarantined units report.
reportsRouter.post('/quarantinedassets', handleQuarantinedAssetsPost);

// Populate the units in use report. 
reportsRouter.post('/assetsinuse', handleAssetsInUsePost);

// Populate the units multiple assets checked out report. 
reportsRouter.post('/multipleassets', handleMultipleAssetsCheckedOutPost);

// Populate the Activity Tracking report. 
reportsRouter.post('/activitytracking', handleActivityTrackingPost);

// Populate Email Distro Table. 
reportsRouter.post('/email-distro', handleEmailDistroPost);

// Remove email from distro. 
reportsRouter.delete('/remove-email', handleRemoveEmailFromDistroDelete);

// Add email to distro. 
reportsRouter.post('/add-email', handleAddEmailToDistroPost);

module.exports = reportsRouter;