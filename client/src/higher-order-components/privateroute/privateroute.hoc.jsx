import React from "react"
import {Route,Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...otherProps }) => {

    const isSignedIn = useSelector(state => state.memberState.memberSignedIn);

    return (
        <Route {...otherProps} render={(props) => (
            isSignedIn === true
            ? <Component {...props} />
            : <Redirect to='/signin' />
        )} />
    )
}


export default PrivateRoute;