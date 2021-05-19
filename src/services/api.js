import axios from 'axios';
// export const API_URL = 'https://lendit-api.herokuapp.com';
export const API_URL = 'http://localhost:3010';

export async function httpRegisterUser(fname, lname, email, password) {
  axios({
    method: 'post',
    url: `${API_URL}/members/register`,
    data:{
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        }
  });  
};

export async function httpSignInUser(email, password) {
  return axios.post(`${API_URL}/members/signin`,{
    email: email,
    password: password,
      })
      .then(response => {
        return response.data;
      })
};

export async function httpFetchSelectedAssetData(assetID, ownerID) {
  if (!assetID || !ownerID){
    return;
  };

  return axios.post(`${API_URL}/assets/asset`, {
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

  return axios.post(`${API_URL}/users/user`, {
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
  return axios.post(`${API_URL}/assets/checkin`, {
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
  return axios.post(`${API_URL}/assets/checkout`, {
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
  return axios.post(`${API_URL}/assets/quarantine`, {
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
  return axios.post(`${API_URL}/users/adduser`, {
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
  return axios.post(`${API_URL}/assets/addasset`, {
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


// export async function removeAsset(assetID) {
//   return axios.delete(`${API_URL}/assets/removeasset`, {
//     id: assetID,
//   })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// };

export const removeAsset = async (assetID) => {
  const settings = {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: assetID,
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/assets/removeasset`,
      settings
    );
    const reply = await response.json();
    return reply;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllAssetsForDropDown = async (dispatchData) => {
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      memberId: dispatchData.payload,
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/assets/allunits`,
      settings
    );
    const assetList = await response.json();
    return assetList;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsersForDropDown = async (dispatchData) => {
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      memberId: dispatchData.payload,
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/users/allusers`,
      settings
    );
    const assetList = await response.json();
    return assetList;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllModelsForDropDown = async (dispatchData) => {
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      memberId: dispatchData.payload,
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/assets/allmodels`,
      settings
    );
    const assetList = await response.json();
    return assetList;
  } catch (error) {
    console.log(error);
  };
};
