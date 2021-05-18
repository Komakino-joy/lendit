import React from "react"
import {Route,Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { isSignedIn } from "../../redux/site-member/site-member.selectors";

const PrivateRoute = ({ component: Component, isSignedIn, ...otherProps }) => (
    <Route {...otherProps} render={(props) => (
        isSignedIn === true
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
);

const mapStateToProps = createStructuredSelector({
    isSignedIn
});

export default connect(mapStateToProps)(PrivateRoute);