import { RECEIVE_SELECTED_USER } from "./user.actions";

// eslint-disable-next-line import/no-anonymous-default-export
const userData = (state = {}, { type, userData }) => {
    switch (type) {
        case RECEIVE_SELECTED_USER:
            return userData;
        default:
            return state;
        }
    };

export default userData;