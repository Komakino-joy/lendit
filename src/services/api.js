import axios from 'axios';

export async function httpRegisterUser(fname, lname, email, password) {
  const data = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
  }

  return await axios.post('/members/register', data);  
};

export async function httpSignInUser(email, password) {
  const data = {
    email: email,
    password: password,
  }

  return await axios.post(`/members/signin`, data)
};

export async function httpFetchSelectedAssetData(assetID, ownerID) {
  if (!assetID || !ownerID){
    return;
  };

  return axios.post(`/assets/asset`, {
    id: assetID,
    owner_id: ownerID
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
};

export async function httpFetchSelectedUserData(userID) {
  if (!userID){
    return;
  };

  return axios.post(`/users/user`, {
    id: userID,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
};

export async function httpCheckInAsset(assetId, userID, owner, assetName, assetSerial, assetModel) {
  return axios.post(`/assets/checkin`, {
    id: assetId,
    username: userID,
    owner: owner,
    assetName: assetName,
    assetSerial: assetSerial,
    assetModel: assetModel,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
};


export async function httpCheckOutAsset(assetId, userID, owner, assetName, assetSerial, assetModel) {
  return axios.post(`/assets/checkout`, {
    id: assetId,
    username: userID,
    owner: owner,
    assetName: assetName,
    assetSerial: assetSerial,
    assetModel: assetModel,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
};

export async function httpQuarantineAsset(assetID, userID, owner, assetName, assetSerial, assetModel, assetComments) {
  return axios.post(`/assets/quarantine`, {
    id: assetID,
    username: userID,
    owner: owner,
    assetName: assetName,
    assetSerial: assetSerial,
    assetModel: assetModel,
    comments: assetComments,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
};


export async function httpCreateNewUser(userId, fname, lname, memberId) {
  return axios.post(`/users/adduser`, {
    userid: userId,
    fname: fname,
    lname: lname,
    memberId: memberId,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
};


export async function httpCreateNewAsset(assetID, assetName, assetModel, assetSerial, memberId) {
  return axios.post(`/assets/addasset`, {
    id: assetID,
    name: assetName,
    model: assetModel,
    serial: assetSerial,
    memberId: memberId,
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
};

export const httpRemoveAsset = async (assetID) => {
  const settings = {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: assetID,
    }),
  };
  try {
    const response = await fetch(
      `/assets/removeasset`,
      settings
    );
    const reply = await response.json();
    return reply;
  } catch (error) {
    console.log(error);
  }
};

export async function httpFetchAllAssetsForDropDown(memberId) {
  return axios.post(`/assets/allunits`, {
    memberId: memberId,
  })
  .then(assetList => {
    return assetList.data;
  })
  .catch(error => {
    console.log(error);
  });
};


export async function fetchAllUsersForDropDown(memberId) {
  return axios.post(`/users/allusers`, {
    memberId: memberId,
  })
  .then(userList => {
    return userList.data;
  })
  .catch(error => {
    console.log(error);
  });
};


export async function httpFetchAllModelsForDropDown(memberId) {
  return axios.post(`/assets/allmodels`, {
    memberId: memberId,
  })
  .then(modelList => {
    return modelList.data;
  })
};
