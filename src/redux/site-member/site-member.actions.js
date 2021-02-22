export const HANDLE_MEMBER_SIGN_IN = "HANDLE_MEMBER_SIGN_IN";
export const HANDLE_MEMBER_SIGN_OUT = "HANDLE_MEMBER_SIGN_OUT"

export const handleMemberSignin = (memberId) => ({
    type: HANDLE_MEMBER_SIGN_IN, memberId
});

export const handleMemberSignout = () => ({
    type: HANDLE_MEMBER_SIGN_OUT
});