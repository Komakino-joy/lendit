import SiteMemberActionTypes from './site-member.types';

export const handleMemberSignout = () => ({
    type: SiteMemberActionTypes.HANDLE_MEMBER_SIGN_OUT
});

export const registrationStart = (userRegistrationInfo) =>({
    type: SiteMemberActionTypes.REGISTER_START,
    payload: userRegistrationInfo,
});

export const registrationSuccess = (user) => ({
    type: SiteMemberActionTypes.REGISTER_SUCCESS,
    payload: user,
});

export const registrationFailure = (error) => ({
    type: SiteMemberActionTypes.REGISTER_FAILURE,
    payload: error,
});

export const signInStart = (emailAndPassword) => ({
    type: SiteMemberActionTypes.SIGN_IN_START,
    payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
    type: SiteMemberActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure = (error) => ({
    type: SiteMemberActionTypes.SIGN_IN_FAILURE,
    payload: error,
});

