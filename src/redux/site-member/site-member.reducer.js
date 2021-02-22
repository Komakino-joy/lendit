import { HANDLE_MEMBER_SIGN_IN, HANDLE_MEMBER_SIGN_OUT } from "./site-member.actions";

const INITIAL_STATE = { 
    memberSignedIn : false,
    memberId: null
};

const memberState = (state = INITIAL_STATE, { type, memberId }) => {
    switch (type) {
    case HANDLE_MEMBER_SIGN_IN:
        return { 
            memberSignedIn : !state.memberSignedIn,
            memberId: memberId
        };

    case HANDLE_MEMBER_SIGN_OUT:
        return {
            state:undefined
        }
    default:
        return state 
    }
};

export default memberState;