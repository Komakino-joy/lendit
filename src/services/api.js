export const API_URL = process.env.API_URL;

export const fetchSelectedAssetData = async (assetID, ownerID) => {
  if (!assetID || !ownerID){
    return;
  };

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: assetID,
      owner_id: ownerID
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/assets/asset`,
      settings
    );
    const asset = await response.json();
    return asset;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectedUserData = async (userID) => {
  if (!userID){
    return;
  };

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userID,
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/users/user`,
      settings
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const checkInAsset = async ( assetId, userID, owner, assetName, assetSerial, assetModel) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: assetId,
      username: userID,
      owner: owner,
      assetName: assetName,
      assetSerial: assetSerial,
      assetModel: assetModel,
    }),
  };
  try {
    await fetch(`${API_URL}/assets/checkin`, settings);
  } catch (error) {
    console.log(error);
  }
};

export const checkOutAsset = async (assetID, userID, owner, assetName, assetSerial, assetModel) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: assetID,
      username: userID,
      owner: owner,
      assetName: assetName,
      assetSerial: assetSerial,
      assetModel: assetModel,
    }),
  };
  try {
    await fetch(`${API_URL}/assets/checkout`, settings);
  } catch (error) {
    console.log(error);
  }
};

export const quarantineAsset = async (assetID, userID, owner, assetName, assetSerial, assetModel, comment) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: assetID,
      username: userID,
      owner: owner,
      assetName: assetName,
      assetSerial: assetSerial,
      assetModel: assetModel,
      comment: comment,
    }),
  };
  try {
    await fetch(`${API_URL}/assets/quarantine`, settings);
  } catch (error) {
    console.log(error);
  }
};

export const createNewUser = async (userId, fname, lname, memberId) => {
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: userId,
      fname: fname,
      lname: lname,
      memberId: memberId,
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/users/adduser`,
      settings
    );
    const reply = await response.json();
    return reply;
  } catch (error) {
    return error;
  }
};

export const createNewAsset = async (assetID, assetName, assetModel, assetSerial, memberId) => {
  const settings = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: assetID,
      name: assetName,
      model: assetModel,
      serial: assetSerial,
      memberId: memberId,
    }),
  };
  try {
    const response = await fetch(
      `${API_URL}/assets/addasset`,
      settings
    );
    const reply = await response.json();
    return reply;
  } catch (error) {
    console.log(error);
  }
};

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
