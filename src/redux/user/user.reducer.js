import UserActionTypes from "./user.types";

// eslint-disable-next-line import/no-anonymous-default-export
const userData = (state = {}, { type, userData }) => {
    switch (type) {
        case UserActionTypes.RECEIVE_SELECTED_USER:
            return userData;
        default:
            return state;
        }
    };

export default userData;