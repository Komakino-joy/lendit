import React, { useEffect } from 'react';
import  { Toaster } from 'react-hot-toast';
import backgroundImage from '../src/images/background.svg';
import {lazy, Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { handleMemberSignout } from './redux/site-member/site-member.actions';

import Navigation from './components/navigation/navigation.component';
import PrivateRoute from "./higher-order-components/privateroute/privateroute.hoc";
import Loader from 'react-loader-spinner';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import './App.css';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const SigninPage = lazy(() => import("./pages/signin/signin.component"));
const RegistrationPage = lazy(() => import("./pages/register/register.component"));

function App() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.memberState.memberSignedIn);
  const memberId = useSelector(state => state.memberState.memberId);

  useEffect(() => {
      if (isSignedIn && !memberId) {
          dispatch(handleMemberSignout());
      }
  }, [dispatch, memberId, isSignedIn])


  return (
    <div className="App">
    <Toaster />
      <Navigation></Navigation>
      <Switch>
        <ErrorBoundary>
          <Suspense 
            className='bg'
            style={{backgroundImage:`url(${backgroundImage})`}}
            fallback= {
              <Loader 
                type="Puff" color="#4178BE" height={70} width={70} className='loader' 
                style={{position: "absolute",top: "20%",left: "50%",margin: "-25px 0 0 -25px"}} />
                }>
            <Route exact path = '/signin'>{isSignedIn ? <Redirect to="/home" /> : <SigninPage />}</Route> 
            <Route exact path = '/register'>{isSignedIn ? <Redirect to="/home" /> : <RegistrationPage />}</Route> 
            <Route exact path = '/' render={() => isSignedIn ? (<Redirect to='/home' />) : (<Redirect to='/signin' />)}/>
            <PrivateRoute  exact path = '/home' component={HomePage}/>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

export default App;
