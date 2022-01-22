import axios from 'axios';

// Fetching records from database

export async function httpSignInUser(email, password) {
  return await axios.post(`/members/signin`, {
    email: email,
    password: password,
  })
};

export async function httpFetchSelectedAssetDetails(assetId, ownerId) {
  if (!assetId || !ownerId) return;

  const response = await axios.post(`/assets/asset`, {
    id: assetId,
    owner_id: ownerId
  })

    return response.data;
};

export async function httpFetchAllAssetsForDropDown(memberId) {
  const response = await axios.post(`/assets/allunits`, {
    memberId: memberId,
  })
  return response.data;
};

export async function httpFetchAllUsersForDropDown(memberId) {
  const response = await axios.post(`/users/allusers`, {
    memberId: memberId,
  })
  return response.data;
};

export async function httpFetchAllModelsForDropDown(memberId) {
  const response = await axios.post(`/assets/allmodels`, {
    memberId: memberId,
  })
  return response.data;
};

export async function httpFetchEmailDistro(memberId) {  
  const response = await axios.post('/reports/email-distro', {
      memberId: memberId,
  });

  return response.data;
};

// Records for reporting
export async function httpFetchAssetsInUse(memberId) {
  const response = await axios.post('/reports/assetsinuse', {
    memberId
  });

  return response.data;
};

export async function httpFetchAvailableAssets(memberId) {
  const response = await axios.post('/reports/availableassets', {
    memberId
  });

  return response.data;
};

export async function httpFetchMultiAssetsByUser(memberId) {
  const response = await axios.post('/reports/multipleassets', {
    memberId
  });

  return response.data;
};

export async function httpFetchQuarantinedAssets(memberId) {
  const response = await axios.post('/reports/quarantinedassets', {
    memberId
  });

  return response.data;
};

// Updating records in database

export async function httpCheckInAsset(assetId, userID, owner, assetName, assetSerial, assetModel) {
  const response = await axios.post(`/assets/checkin`, {
      id: assetId,
      username: userID,
      owner: owner,
      assetName: assetName,
      assetSerial: assetSerial,
      assetModel: assetModel,
  });

  return response.data;
};

export async function httpCheckOutAsset(assetId, userID, owner, assetName, assetSerial, assetModel, fname, lname) {
  const response = await  axios.post(`/assets/checkout`, {
    id: assetId,
    username: userID,
    owner: owner,
    assetName: assetName,
    assetSerial: assetSerial,
    assetModel: assetModel,
    fname, 
    lname
  });

  return response.data;
};

export async function httpQuarantineAsset(assetID, userID, owner, assetName, assetSerial, assetModel, assetComments) {
  const response = await  axios.post(`/assets/quarantine`, {
    id: assetID,
    username: userID,
    owner: owner,
    assetName: assetName,
    assetSerial: assetSerial,
    assetModel: assetModel,
    comments: assetComments,
  });

    return response.data;
};

// Creating new records in database

export async function httpRegisterUser(fname, lname, email, password) {
  return await axios.post('/members/register', {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
  });  
};

export async function httpCreateNewUser(userId, fname, lname, memberId) {
  const response = await  axios.post(`/users/adduser`, {
    userid: userId,
    fname: fname,
    lname: lname,
    memberId: memberId,
  });

  return response.data;
};

export async function httpCreateNewAsset(assetID, assetName, assetModel, assetSerial, memberId) {
  const response = await axios.post(`/assets/addasset`, {
    id: assetID,
    name: assetName,
    model: assetModel,
    serial: assetSerial,
    memberId: memberId,
  })
    return response.data;
};

export async function httpAddEmailToDistro(memberId, email) {
  const response = await axios.post('/reports/add-email', {
    memberId: memberId,
    email: email,
  });

  return response.data;
};

export async function httpAddModel(memberId, model, image, responseAlert) {
  try {    
    const response = await axios.post('/assets/upload', {
        memberId,
        model,
        image,
      });

    return responseAlert(response.data.message, "success");

  } catch (error) {
    responseAlert(error.response.data.message, "error");
  }
};

// Deleting records in database

export async function httpRemoveAsset(memberId, assetId) {
  const response = await axios.delete('/assets/removeasset',{
    data: {
      memberId,
      assetId
    }
  })
  return response.data;
};

export async function httpDeleteEmailFromDistro(memberId, email) {
  const response = await axios.delete('/reports/remove-email', {
    data: {
      memberId,
      email,
    },
  });
  return response.data;
};

export async function httpDeleteUser(memberId, userId) {
  const response = await axios.delete('/users/remove-user', {
    data: {
      memberId,
      userId,
    },
  });
  return response.data; 
};
