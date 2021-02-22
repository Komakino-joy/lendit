import React from "react"
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { isSignedIn } from "../../redux/site-member/site-member.selectors";

import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        isSignedIn === true
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
);

const mapStateToProps = createStructuredSelector({
    isSignedIn
});

export default connect(mapStateToProps)(PrivateRoute);