export const fetchSelectedAssetData = async (assetID, ownerID) => {
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
      `http://localhost:3000/asset`,
      settings
    );
    const asset = await response.json();
    return asset;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectedUserData = async (userID) => {
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
      `http://localhost:3000/user`,
      settings
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const checkInAsset = async (
  assetId,
  owner,
  assetName,
  assetSerial,
  assetModel
) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: assetId,
      owner,
      assetName,
      assetSerial,
      assetModel,
    }),
  };
  try {
    await fetch(`http://localhost:3000/checkin`, settings);
  } catch (error) {
    console.log(error);
  }
};

export const checkOutAsset = async (
  assetID,
  userID,
  owner,
  assetName,
  assetSerial,
  assetModel
) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: assetID,
      username: userID,
      owner,
      assetName,
      assetSerial,
      assetModel,
    }),
  };
  try {
    await fetch(`http://localhost:3000/checkout`, settings);
  } catch (error) {
    console.log(error);
  }
};

export const quarantineAsset = async (
  assetID,
  userID,
  owner,
  assetName,
  assetSerial,
  assetModel,
  comment
) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: assetID,
      username: userID,
      owner,
      assetName,
      assetSerial,
      assetModel,
      comment,
    }),
  };
  try {
    await fetch(`http://localhost:3000/quarantine`, settings);
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
      `http://localhost:3000/adduser`,
      settings
    );
    const reply = await response.json();
    return reply;
  } catch (error) {
    return error;
  }
};

export const createNewAsset = async (
  assetID,
  assetName,
  assetModel,
  assetSerial,
  memberId
) => {
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
      "http://localhost:3000/addasset",
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
      "http://localhost:3000/removeasset",
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
      "http://localhost:3000/allunits",
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
      "http://localhost:3000/allusers",
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
      "http://localhost:3000/allmodels",
      settings
    );
    const assetList = await response.json();
    return assetList;
  } catch (error) {
    console.log(error);
  }
};
