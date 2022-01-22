import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { handleMemberSignout } from "../../redux/site-member/site-member.actions";

import { NavList, NavOption } from "./navigation.styles";

const Navigation = ({ history }) => {

  const dispatch = useDispatch();

  const isSignedIn = useSelector(state => state.memberState.memberSignedIn);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(handleMemberSignout());
    history.push('/signin');
  }

    if (isSignedIn) {
      return (
        <NavList>
          <NavOption onClick={handleSignOut}>Sign Out</NavOption>
        </NavList>
      );
    } else {
      return (
        null
      );
    }
}


export default withRouter(Navigation);