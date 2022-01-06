import SiteMemberActionTypes from "./site-member.types";

const INITIAL_STATE = { 
    memberSignedIn : false,
    memberId: null,
    error: null
};

const memberState = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case SiteMemberActionTypes.SIGN_IN_SUCCESS:
        return { 
            // Evaluate memberId to Boolean
            memberSignedIn : true,
            memberId: action.payload.id,
            error: null,
        };

    case SiteMemberActionTypes.HANDLE_MEMBER_SIGN_OUT:
        return {
            state:undefined
        }
    case SiteMemberActionTypes.REGISTER_FAILURE:
    case SiteMemberActionTypes.SIGN_IN_FAILURE:
        return {
            ...state,
            error: action.payload,
        }
    default:
        return state 
    }
};

export default memberState;