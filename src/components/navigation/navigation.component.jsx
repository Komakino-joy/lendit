import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { isSignedIn } from "../../redux/site-member/site-member.selectors";

import { handleMemberSignout } from "../../redux/site-member/site-member.actions";

import { NavList, NavOption } from "./navigation.styles";

const Navigation = ({history, isSignedIn, signOut }) => {
    if (isSignedIn) {
      return (
        <NavList>
          <NavOption onClick={() => {signOut(); history.push('/signin');}}>Sign Out</NavOption>
        </NavList>
      );
    } else {
      return (
        null
      );
    }
}

const mapStateToProps = createStructuredSelector({
  isSignedIn
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => {dispatch(handleMemberSignout())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));